import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Canvas } from "react-three-fiber";

ReactDOM.render(
  <Canvas>
    <App />
  </Canvas>,
  document.getElementById("root")
);

reportWebVitals();
