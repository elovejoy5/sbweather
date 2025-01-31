import React, { useState, useEffect } from "react";
import SunCalc from "suncalc";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface SunsetRow {
  id: number;
  date: string;
  sunriseTime: string;
  sunsetTime: string;
  moonriseTime: string;
  moonsetTime: string;
  moonPhase: string;
}

export const SunsetTimes: React.FC = () => {
  const [sunsetTimes, setSunsetTimes] = useState<SunsetRow[]>([]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "sunriseTime",
      headerName: "Sunrise",
      flex: 1,
    },
    {
      field: "sunsetTime",
      headerName: "Sunset",
      flex: 1,
    },
    {
      field: "moonriseTime",
      headerName: "Moonrise",
      flex: 1,
    },
    {
      field: "moonsetTime",
      headerName: "Moonset",
      flex: 1,
    },
    {
      field: "moonPhase",
      headerName: "Moon Phase",
      flex: 1,
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Calculate times for next 30 days
      const times = Array.from({ length: 30 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);

        const sunTimes = SunCalc.getTimes(date, latitude, longitude);
        const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude);
        const moonIllumination = SunCalc.getMoonIllumination(date);

        // Convert moon phase number to descriptive text
        const getMoonPhaseName = (phase: number) => {
          if (phase < 0.05) return "New Moon";
          if (phase < 0.25) return "Waxing Crescent";
          if (phase < 0.3) return "First Quarter";
          if (phase < 0.45) return "Waxing Gibbous";
          if (phase < 0.55) return "Full Moon";
          if (phase < 0.7) return "Waning Gibbous";
          if (phase < 0.8) return "Last Quarter";
          return "Waning Crescent";
        };

        const formatTime = (time: Date) =>
          time.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

        return {
          id: index,
          date:
            date.toLocaleDateString("en-US", {
              weekday: "long",
            }) +
            " " +
            date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
          sunriseTime: formatTime(sunTimes.sunrise),
          sunsetTime: formatTime(sunTimes.sunset),
          moonriseTime: moonTimes.rise
            ? formatTime(moonTimes.rise)
            : "Not Visible",
          moonsetTime: moonTimes.set
            ? formatTime(moonTimes.set)
            : "Not Visible",
          moonPhase: getMoonPhaseName(moonIllumination.phase),
        };
      });
      console.log(times);

      setSunsetTimes(times);
    });
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h1>Sunset Times</h1>
      <DataGrid
        rows={sunsetTimes}
        columns={columns}
        // pageSizeOptions={[10, 20, 30]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 50 },
          },
        }}
      />
    </div>
  );
};
