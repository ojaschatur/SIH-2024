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
    <span className="arrow" onClick={() => handlePageChange(currentPage - 1)}>&larr; Previous</span>

    {currentPage > 1 && <button onClick={() => handlePageChange(1)}>1</button>}
    {currentPage > 3 && <span className="dots">...</span>}
    
    {Array.from({ length: totalPages }, (_, index) => {
        if (index + 1 === currentPage || index + 1 === currentPage - 1 || index + 1 === currentPage + 1) {
            return (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                >
                    {index + 1}
                </button>
            );
        }
        return null;
    })}

    {currentPage < totalPages - 2 && <span className="dots">...</span>}
    {currentPage < totalPages && <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>}

    <span className="arrow" onClick={() => handlePageChange(currentPage + 1)}>Next &rarr;</span>
</div>

    </div>
  );
}

export default Log;