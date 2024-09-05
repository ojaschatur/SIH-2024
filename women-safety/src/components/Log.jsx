import { useState, useEffect } from "react";
import cctvFootage from "./photos/cctvFootage.svg";
import "./Log.css";

function Log() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:3000/logs')
      .then((response) => response.json())
      .then((data) => {
        const sortedLogs = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setLogs(sortedLogs);
      })
      .catch((error) => console.error('Error fetching logs:', error));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(logs.length / logsPerPage);

  return (
    <div className="logContainer">
      {currentLogs.length > 0 ? (
        currentLogs.map((log, index) => (
          <div key={index} className="log">
            <img src={cctvFootage} alt="Log Image" className="logImg" />
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

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Log;