import React from "react";
import { Forecast } from "./Forecast";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./nav/Footer";
import { Masthead } from "./nav/Masthead";
import { About } from "./About";

function App() {
  /**
   * per https://create-react-app.dev/docs/deployment/#building-for-relative-paths
   * basename is added to Router here so https://elovejoy5.github.io/sbweather/ will work
   */
  return (
    <Router basename="/sbweather/">
      <CssBaseline />
      <Masthead />
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default App;

export const AppRoutes = () => (
  <div className="App">
    <Routes>
      <Route path="about" element={<About />} />
      <Route path="*" element={<Forecast />} />
    </Routes>{" "}
  </div>
);
