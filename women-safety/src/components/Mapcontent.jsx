import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "./mapcontent.css";
import cctvFootage from "./photos/cctvFootage.svg";
import Leaflet from "./Leaflet";

export default function MapContent() {
  const [locationInfo, setLocationInfo] = useState(null);
  const navigate = useNavigate();

  const handleLocationSelected = (location) => {
    setLocationInfo(location);
  };

  return (
    <div className="container">
      <h2>Map:</h2>
      <div className="map-container">
        <div className="map-image">
          <Leaflet onLocationSelected={handleLocationSelected} />
        </div>
      </div>
      <div className="cctv-container">
        <div className="cctv-information">
          <div className="cctv-image">
            <img src={cctvFootage} alt="CCTV Footage" />
          </div>
          <div className="cctv-info">
            <h3>CCTV Footage</h3>
            <p className="cctv-location">
              <strong>{locationInfo?.text || "No location selected"}</strong>
            </p>
            <p className="cctv-imp-info">
              Important information about the location:
            </p>
            <p>
              Number of people: <strong>{locationInfo?.people || 4}</strong>
            </p>
            <p>
              Time:{" "}
              <strong>
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
            </p>
            <p>
              Gesture: <strong>{locationInfo?.gesture || "Standing"}</strong>
            </p>

            {/* View Live CCTV button */}
            <button className="view-live-btn" onClick={() => navigate('/live-cctv')}>
              View Live CCTV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
