import React from "react";
import "./App.css";
import { Forecast } from "./Forecast";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      Santa Barbara Forecast
      <Forecast />
    </div>
  );
}

export default App;
