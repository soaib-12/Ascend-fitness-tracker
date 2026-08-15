import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ==============================================================
// index.js
// --------------------------------------------------------------
// The entry point of the React app. It finds the <div id="root">
// element inside public/index.html and tells React to render our
// <App /> component tree inside it.
// ==============================================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
