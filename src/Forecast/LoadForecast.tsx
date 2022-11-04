import React, { useEffect } from "react";
import { getForecast, NwsForecast } from "./util";

/**
 *
 * All LoadForecast does is load the forcast from NWS API and pass it to state of parent component
 *
 */
export const LoadForecast = ({
  setForecast,
}: {
  setForecast: (arg0: NwsForecast) => void;
}) => {
  // export const LoadForecast = (setForecast: (arg0: NwsForecast) => void) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: NwsForecast = await getForecast();
        if (
          Object.keys(data).includes("properties") ||
          Object.keys(data).includes("status")
        ) {
          console.log("LoadForecast data,", data);
          // only update state (and trigger re-render) when we know we got either:
          // 1. JSON with `properties` that we expect API to render
          // 2. JSON with `status` that API returns from time to time with 500
          setForecast(data);
        }
      } catch (e) {
        console.log("LoadForecast Error: ", e);
      }
    };

    fetchData();
  }, [setForecast]);

  return <div>Loading Forecast...</div>;
};
