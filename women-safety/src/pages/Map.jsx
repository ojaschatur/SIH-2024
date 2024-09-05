import React from 'react';
import Navbar from "../components/Navbar";
import "./Map.css";

const MapAccess = () => {
  return (
    <div className="map-access-container">
      <Navbar />
      <section className="map-access">
        <h1><span className="highlight">MAP </span>ACCESS</h1>
        <p className="description">
          This heatmap visually represents the distribution and <span className="highlight">frequency of crimes</span> against women across different states of India, with darker areas indicating higher crime rates. By providing <span className="highlight">real-time insights</span>, it helps identify <span className="highlight">hotspots</span> and trends to enhance safety measures and law enforcement response.
        </p>

        <div className="map-section">
          <img src="map-image.png" alt="Crime Heatmap" className="map-image" />
        </div>
        <div className="cctv-cards">
          <div className="cctv-card">
            <img src="cctv-image.png" alt="CCTV Footage" className="cctv-image" />
            <div className="cctv-details">
              <p><strong>Area:</strong> Building No. 22, Tilak Nagar, Ghatkopar West, 400007</p>
              <p><strong>Date:</strong> [Date]</p>
              <p><strong>Time:</strong> [Time]</p>
              <p><strong>No. of Men:</strong> [Number]</p>
              <p><strong>Latitude:</strong> [Latitude]</p>
              <p><strong>Longitude:</strong> [Longitude]</p>
              <button className="view-cctv-button">View Live CCTV</button>
            </div>
          </div>

          <div className="cctv-card">
            <img src="cctv-image.png" alt="CCTV Footage" className="cctv-image" />
            <div className="cctv-details">
              <p><strong>Area:</strong> Building No. 22, Tilak Nagar, Ghatkopar West, 400007</p>
              <p><strong>Date:</strong> [Date]</p>
              <p><strong>Time:</strong> [Time]</p>
              <p><strong>No. of Men:</strong> [Number]</p>
              <p><strong>Latitude:</strong> [Latitude]</p>
              <p><strong>Longitude:</strong> [Longitude]</p>
              <button className="view-cctv-button">View Live CCTV</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapAccess;
