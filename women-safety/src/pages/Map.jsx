import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Map.css";
import LeafletMap from "../components/leafletMap";
import MapContent from "../components/Mapcontent";

const MapAccess = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/live-cctv");
  };
  return (
    <div className="map-access-container">
      <Navbar />
      <section className="map-access">
        <h1 class="map-h1"><span className="highlight">MAP </span>ACCESS</h1>
        <p class="map-p">
          This heatmap visually represents the distribution and <span className="highlight">frequency of crimes</span> against women across different states of India, with darker areas indicating higher crime rates. By providing <span className="highlight">real-time insights</span>, it helps identify <span className="highlight">hotspots</span> and trends to enhance safety measures and law enforcement response.
        </p>

        <MapContent />

      </section>
    </div>
  );
};

export default MapAccess;
