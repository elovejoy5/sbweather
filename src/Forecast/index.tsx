import React, { useState } from "react";

import { NwsForecast } from "./_getForecast";
import { LoadForecast } from "./LoadForecast";
import { ForecastSummary } from "./ForecastSummary";
export const Forecast = () => {
  // MVP: store forecat in component state:
  const [forecast, setForecast] = useState<NwsForecast>({});

  if (Object.keys(forecast).length === 0) {
    // no state? Render LoadForecast to retreive from API
    return <LoadForecast setForecast={setForecast} />;
  }

  if (forecast.status === 500) {
    return (
      <div>
        <p>
          NWS Forecast API sometimes returns 500. A refresh usually resolves
          this
        </p>
        <pre>{JSON.stringify(forecast, null, 2)}</pre>
      </div>
    );
  }

  // default: render a summary of the forecast
  return <ForecastSummary forecast={forecast} />;
};
