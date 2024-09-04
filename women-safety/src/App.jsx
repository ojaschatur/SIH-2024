import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes } from "react-router-dom";
// import { Route } from "react-router-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>


      
      {/* remove the code above? */}



      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Header />} /> */}
          {/* <Route path="/:id/home" element={<Header />} />
              <Route path="/:id/heatmap" element={<Header />} />
              <Route path="/:id/map" element={<Header />} />
              <Route path="/:id/logs" element={<Header />} /> */}
          {/* <Route path="/home" element={<Header />} />
          <Route path="/heatmap" element={<Header />} />
          <Route path="/map" element={<Header />} />
          <Route path="/logs" element={<Header />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
