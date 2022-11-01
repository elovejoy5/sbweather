import React, { useEffect } from "react";
import { getForecast, NwsForecast } from "./_getForecast";

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
        console.log("loading api!");
        const data: NwsForecast = await getForecast();
        console.log("LoadForecast data,", data);
        setForecast(data);
      } catch (e) {
        console.log("LoadForecast Error: ", e);
      }
    };

    fetchData();
  }, [setForecast]);

  return <div>Loading Forecast...</div>;
};
