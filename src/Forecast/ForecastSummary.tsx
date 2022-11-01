import React from "react";
import { NwsForecast } from "./_getForecast";

export const ForecastSummary = ({ forecast }: { forecast: NwsForecast }) => {
  return (
    <div>
      <h1>Forecast</h1>
      <h2>Now:</h2>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(forecast?.properties?.periods[0], null, 2)}
      </pre>
      <h2>All:</h2>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(forecast, null, 2)}
      </pre>
    </div>
  );
};
