import { useState, useEffect } from "react";
import {
  getAstronomicalData,
  type AstronomicalEvent,
} from "../util/getAstronomicalData";

export const AstronomicalData: React.FC = () => {
  const [astronomicalEvents, setAstronomicalEvents] = useState<
    AstronomicalEvent[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAstronomicalData({
        latitude: 34.416667,
        longitude: -119.683333,
        startDate: new Date(),
        numberOfDays: 30,
      });

      setAstronomicalEvents(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Astronomical Data</h1>
      <pre>{JSON.stringify(astronomicalEvents, null, 2)}</pre>
    </div>
  );
};
