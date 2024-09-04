import { useState } from "react";
// import { BrowserRouter, Routes } from "react-router-dom";
// import { Route } from "react-router-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello</h1>
    </>



      // <BrowserRouter>
      //   <Routes>
      //     {/* <Route path="/" element={<Header />} /> */}
      //     {/* <Route path="/:id/home" element={<Header />} />
      //         <Route path="/:id/heatmap" element={<Header />} />
      //         <Route path="/:id/map" element={<Header />} />
      //         <Route path="/:id/logs" element={<Header />} /> */}
      //     {/* <Route path="/home" element={<Header />} />
      //     <Route path="/heatmap" element={<Header />} />
      //     <Route path="/map" element={<Header />} />
      //     <Route path="/logs" element={<Header />} /> */}
      //   </Routes>
      // </BrowserRouter>
  );
}

export default App;
