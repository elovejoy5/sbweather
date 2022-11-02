import React from "react";
import "./App.css";
import { Forecast } from "./Forecast";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          Santa Barbara Forecast
        </NavLink>
        <Routes>
          <Route path="/" element={<Forecast />} />
          <Route path="about" element={<About />} />
        </Routes>{" "}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

const Footer = () => (
  <div>
    <NavLink
      to="/about"
      style={({ isActive }) => ({
        textDecoration: isActive ? "none" : "underline",
      })}
    >
      About
    </NavLink>{" "}
    <NavLink
      to="/"
      style={({ isActive }) => ({
        textDecoration: isActive ? "none" : "underline",
      })}
    >
      Home
    </NavLink>
  </div>
);

const About = () => (
  <div>
    <h1>About `sbweather`</h1>
    <p>
      `sbweather` is a prototype react app. I need a bit of code to hack on,
      share, and write about while I'm job hunting in November 2022 for the
      first time since 2001.
    </p>
    <p>
      Since I'm often curious about the weather here, maybe I'll keep at it and
      it will become more than a code sample.
    </p>
    <p>
      <a href="https://github.com/elovejoy5/sbweather">Learn more</a>
    </p>
  </div>
);
