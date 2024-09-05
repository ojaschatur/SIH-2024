import { useEffect, useState } from 'react';
import './Log.css';

function Log() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/logs')
      .then((response) => response.json())
      .then((data) => setLogs(data))
      .catch((error) => console.error('Error fetching logs:', error));
  }, []);

  return (
    <div className="logContainer">
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <div key={index} className="log">
            <img src="../assets/logs.png" alt="" className="logImg" />
            <div className="logText">
              <div className="titles">
                <p className="title">Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
                <p className="title">Location: {log.location}</p>
                <p className="title">Men Count: {log.men_count}</p>
                <p className="title">Women Count: {log.women_count}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No logs available</p>
      )}
    </div>
  );
}

export default Log;