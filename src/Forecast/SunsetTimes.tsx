import React, { useState, useEffect } from "react";
import SunCalc from "suncalc";

export const SunsetTimes: React.FC = () => {
  const [sunPosition, setSunPosition] = useState<{
    altitude: number;
    azimuth: number;
  } | null>(null);

  useEffect(() => {
    // Get current position using Geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // Calculate sun position
      const sunPos = SunCalc.getPosition(new Date(), latitude, longitude);
      setSunPosition(sunPos);
    });
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div>
      <h1>Sunset Times</h1>
      <p>sunPosition: {sunPosition?.altitude}</p>
    </div>
  );
};
