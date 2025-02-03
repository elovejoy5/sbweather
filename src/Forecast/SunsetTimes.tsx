import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  getAstronomicalData,
  type AstronomicalDay,
} from "./util/getAstronomicalData";

interface SunsetRow extends AstronomicalDay {
  id: number;
}

export const SunsetTimes: React.FC = () => {
  const [sunsetTimes, setSunsetTimes] = useState<SunsetRow[]>([]);

  const columns: GridColDef[] = [
    {
      field: "displayDate",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "sunrise",
      headerName: "Sunrise",
      flex: 1,
    },
    {
      field: "sunset",
      headerName: "Sunset",
      flex: 1,
    },
    {
      field: "moonrise",
      headerName: "Moonrise",
      flex: 1,
    },
    {
      field: "moonset",
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
    const fetchData = async () => {
      const astronomicalData = await getAstronomicalData({
        latitude: 34.416667,
        longitude: -119.683333,
        startDate: new Date(),
        numberOfDays: 30,
      });

      setSunsetTimes(
        astronomicalData.map((day, index) => ({
          id: index,
          ...day,
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h1>Sunset Times</h1>
      <DataGrid
        rows={sunsetTimes}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 50 },
          },
        }}
      />
    </div>
  );
};
