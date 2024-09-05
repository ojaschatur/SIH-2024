import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./leafletMap.css";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function animateMarker(marker, routeCoordinates) {
  let i = 0;
  const delay = 100;
  const moveMarker = () => {
    if (i < routeCoordinates.length) {
      marker.setLatLng([routeCoordinates[i].lat, routeCoordinates[i].lng]);
      i++;
      setTimeout(moveMarker, delay);
    }
  };
  moveMarker();
}

const reverseGeocode = async (lat, lng) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.display_name || "Unknown Location";
};

const LeafletMap = (props) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const myLocationRef = useRef(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [patrolLocation, setPatrolLocation] = useState(null);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const defaultMumbaiPosition = [19.076, 72.8777];
    const defaultZoomLevel = 12;

    mapInstanceRef.current = L.map(mapRef.current).setView(
      defaultMumbaiPosition,
      defaultZoomLevel
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current);

    let mumbaiMarker = L.marker(defaultMumbaiPosition, {
      icon: defaultIcon,
    }).addTo(mapInstanceRef.current);
    mumbaiMarker.bindPopup("Mumbai, India").openPopup();

    setTimeout(() => {
      mapInstanceRef.current.locate({ setView: true, maxZoom: 16 });

      mapInstanceRef.current.on("locationfound", async function (e) {
        try {
          myLocationRef.current = e.latlng;
          const placeName = await reverseGeocode(e.latlng.lat, e.latlng.lng);
 
          const locationData = ({
            lat: e.latlng.lat.toFixed(6),
            lng: e.latlng.lng.toFixed(6),
            text: placeName,
          });

          setLocationInfo(locationData);

          if (props.onLocationSelected) {
            props.onLocationSelected(locationData);
          }

          if (mapInstanceRef.current) {
            mapInstanceRef.current.removeLayer(mumbaiMarker);

            let myHome = L.marker(myLocationRef.current, {
              icon: defaultIcon,
            }).addTo(mapInstanceRef.current);
            myHome.bindPopup(placeName).openPopup();
          }
        } catch (error) {
          console.error("Error setting location marker:", error);
        }
      });

      mapInstanceRef.current.on("locationerror", function (e) {
        alert("Location access denied.");
      });
    }, 500);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  const findNearestPoliceStation = () => {
    if (!myLocationRef.current) {
      alert("Your location is not yet determined. Please wait.");
      return;
    }

    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const query = `
      [out:json];
      (
        node["amenity"="police"](around:10000,${myLocationRef.current.lat},${myLocationRef.current.lng});
      );
      out body;
    `;

    fetch(overpassUrl, {
      method: "POST",
      body: query,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.elements.length > 0) {
          let nearestStation = data.elements.reduce((prev, curr) => {
            let prevDist = Math.hypot(
              prev.lat - myLocationRef.current.lat,
              prev.lon - myLocationRef.current.lng
            );
            let currDist = Math.hypot(
              curr.lat - myLocationRef.current.lat,
              curr.lon - myLocationRef.current.lng
            );
            return prevDist < currDist ? prev : curr;
          });

          let policeMarker = L.marker(
            [nearestStation.lat, nearestStation.lon],
            { icon: defaultIcon }
          ).addTo(mapInstanceRef.current);
          policeMarker
            .bindPopup(nearestStation.tags.name || "Nearest Police Station")
            .openPopup();

          let routeControl = L.Routing.control({
            waypoints: [
              L.latLng(nearestStation.lat, nearestStation.lon),
              L.latLng(myLocationRef.current),
            ],
            createMarker: function () {
              return null;
            },
          }).addTo(mapInstanceRef.current);

          routeControl.on("routesfound", function (e) {
            let routes = e.routes;
            let movingMarker = L.marker(
              [nearestStation.lat, nearestStation.lon],
              { icon: defaultIcon }
            ).addTo(mapInstanceRef.current);
            animateMarker(movingMarker, routes[0].coordinates);
          });
        } else {
          alert("No police stations found nearby.");
        }
      })
      .catch((err) => console.error(err));
  };

  function getRandomPoint(center, radius) {
    let x0 = center.lng;
    let y0 = center.lat;
    let radiusInDegrees = radius / 111320;

    let u = Math.random();
    let v = Math.random();

    let w = radiusInDegrees * Math.sqrt(u);
    let t = 2 * Math.PI * v;
    let x = w * Math.cos(t);
    let y = w * Math.sin(t);

    let newX = x / Math.cos(y0 * (Math.PI / 180));

    let foundLongitude = newX + x0;
    let foundLatitude = y + y0;

    return [foundLatitude, foundLongitude];
  }

  async function routeFromRandomPoint() {
    if (!myLocationRef.current) {
      alert("Your location is not yet determined. Please wait.");
      return;
    }

    let randomPoint = getRandomPoint(myLocationRef.current, 3000);

    if (isNaN(randomPoint[0]) || isNaN(randomPoint[1])) {
      console.error("Generated invalid random point:", randomPoint);
      alert("Failed to generate a valid random point. Please try again.");
      return;
    }

    const placeName = await reverseGeocode(randomPoint[0], randomPoint[1]);

    setPatrolLocation({
      lat: randomPoint[0].toFixed(6),
      lng: randomPoint[1].toFixed(6),
      text: placeName,
    });

    let movingMarker = L.marker([randomPoint[0], randomPoint[1]], {
      icon: defaultIcon,
    }).addTo(mapInstanceRef.current);

    let routeControl = L.Routing.control({
      waypoints: [
        L.latLng(randomPoint[0], randomPoint[1]),
        L.latLng(myLocationRef.current.lat, myLocationRef.current.lng),
      ],
      createMarker: function () {
        return null;
      },
    }).addTo(mapInstanceRef.current);

    routeControl.on("routesfound", function (e) {
      let route = e.routes[0].coordinates;
      animateMarker(movingMarker, route);
    });

    setRoutes((prevRoutes) => [
      ...prevRoutes,
      { routeControl, marker: movingMarker },
    ]);
  }

  return (
    <div>
      <div ref={mapRef} id="map" style={{ width: "80vw", height: "600px" }}></div>
      <div className="button-container">
        <button onClick={findNearestPoliceStation} className="button button-primary">
          Find Nearest Police Station
        </button>
        <button
          onClick={() => {
            mapInstanceRef.current.off("click");
            routeFromRandomPoint();
          }}
          className="button button-secondary"
        >
          Route from Patrolling unit
        </button>
      </div>
      {locationInfo && (
        <div className="location-info">
          <h2>Your Location</h2>
          <p>Latitude: {locationInfo.lat}</p>
          <p>Longitude: {locationInfo.lng}</p>
          <p><strong>{locationInfo.text}</strong></p>
        </div>
      )}
      {patrolLocation && (
        <div className="location-info">
          <h2>Patrol Location</h2>
          <p>Latitude: {patrolLocation.lat}</p>
          <p>Longitude: {patrolLocation.lng}</p>
          <p><strong>{patrolLocation.text}</strong></p>
        </div>
      )}
      {routes.length > 0 && (
        <div className="routes-info">
          <h3>Active Routes</h3>
          {routes.map((route, index) => (
            <div key={index} className="route-item">
              <p>Route #{index + 1}</p>
              <button
                onClick={() => {
                  route.routeControl.getPlan().setWaypoints([]);
                  mapInstanceRef.current.removeLayer(route.marker);
                  setRoutes((prevRoutes) =>
                    prevRoutes.filter((_, i) => i !== index)
                  );
                }}
                className="button button-remove"
              >
                Remove Route
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
