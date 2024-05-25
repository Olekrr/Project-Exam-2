import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router here
import { AuthProvider } from "./contexts/authContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
