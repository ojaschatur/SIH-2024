import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Heatmap from "./pages/Heatmap";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/:id/home" element={<Header />} />
              <Route path="/:id/heatmap" element={<Header />} />
              <Route path="/:id/map" element={<Header />} />
              <Route path="/:id/logs" element={<Header />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/heatmap" element={<Heatmap />} />
          {/* <Route path="/map" element={<Header />} />
          <Route path="/logs" element={<Header />} />  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
