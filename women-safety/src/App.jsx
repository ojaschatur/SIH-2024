import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Heatmap from "./pages/Heatmap";
import Map from "./pages/Map";
import Logs from "./pages/Logs";
import "./App.css";
import CCTV from "./pages/CCTV";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* /* <Route path="/:id/home" element={<Header />} />
              <Route path="/:id/heatmap" element={<Header />} />
              <Route path="/:id/map" element={<Header />} /> */}
          <Route path="/logs" element={<Logs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/map" element={<Map />} />
          <Route path="/live-cctv" element={<CCTV />} />
          {/* <Route path="/map" element={<Header />} />
          <Route path="/logs" element={<Header />} />  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
