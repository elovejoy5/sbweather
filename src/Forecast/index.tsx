import React from "react";
import { ForecastSummary } from "./ForecastSummary";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { apiSuccessJson } from "../mocks/test_payloads";
import { getForecast } from "./util";

export const Forecast = () => {
  // component uses react-query to call getForecast:
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["nwsForecast"],
    queryFn: getForecast,
    retry: false,
    staleTime: 300000, // 5 min cache = 1000*60*5
  });
  if (isLoading) return <div>"Loading..."</div>;

  if (isError || data === undefined) {
    console.log(`getForecast returned error: ${error}`);
    // No forecast? Render a dummy forecast:
    return <ForecastWithDummyData />;
  }

  // default: render a summary of the forecast
  console.log("getForecast returned data: ", data);
  return (
    <div>
      <ForecastSummary forecast={data} />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

const ForecastWithDummyData = () => {
  return (
    <div>
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
      </div>
      <h1>Sample Data</h1>
      <ForecastSummary forecast={apiSuccessJson} />
    </div>
  );
};
