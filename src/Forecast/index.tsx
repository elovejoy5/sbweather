import React, { useState } from "react";

import { NwsForecast } from "./util";
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
          NWS Forecast API intermittently returns 500{" "}
          <a href="https://github.com/weather-gov/api/discussions/241">
            e.g. this discussion
          </a>
          . It may be necessary to implement some sort of cache avoid tripping
          over this.
        </p>
        <p>
          <a href="https://www.weather.gov/documentation/services-web-api">
            API documentation
          </a>{" "}
          states that "A User Agent is required to identify your application.
          This string can be anything, and the more unique to your application
          the less likely it will be affected by a security event. If you
          include contact information (website or email), we can contact you if
          your string is associated to a security event. This will be replaced
          with an API key in the future."
        </p>
        <pre>User-Agent: (myweatherapp.com, contact@myweatherapp.com)</pre>
        <p>Error message from API:</p>
        <pre>{JSON.stringify(forecast, null, 2)}</pre>
      </div>
    );
  }

  // default: render a summary of the forecast
  return <ForecastSummary forecast={forecast} />;
};
