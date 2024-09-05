import log from "../assets/logs.png";
import "./Log.css";

function Log(props) {
  return (
    
      <div className="log">
        <img src={log} alt="" className="logImg" />
        <div className="logText">
          <div className="titles">
            <p className="title">Location:</p>
            <p className="title">Date:</p>
            <p className="title">Time:</p>
            <p className="title">No. of Men:</p>
            <p className="title">Latitude:</p>
            <p className="title">Longitude:</p>
          </div>
          <div className="info">
            <p>{props.location || "Location not available"}</p>
            <p>{props.date || "Date not available"}</p>
            <p>{props.time || "Time not available"}</p>
            <p>{props.men || "Men count not available"}</p>
            <p>{props.latitude || "Latitude not available"}</p>
            <p>{props.longitude || "Longitude not available"}</p>
          </div>
        </div>
      </div>

  );
}

export default Log;
