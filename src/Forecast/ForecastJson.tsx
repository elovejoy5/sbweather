import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getForecast } from "./util";

export function ForecastJson() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["forecast"],
    queryFn: getForecast,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading forecast</div>;

  return (
    <div style={{ margin: "10px", overflow: "auto" }}>
      <p>raw JSON from NWS API:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
