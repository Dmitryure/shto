import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Canvas } from "react-three-fiber";

ReactDOM.render(
  <div style={{height: "500px"}}>
    <Canvas>
      <pointLight position={[10, 20, 130]} />
      <App  />
    </Canvas>
  </div>,
  document.getElementById("root")
);

reportWebVitals();
