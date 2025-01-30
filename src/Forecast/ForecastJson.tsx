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
    <pre style={{ margin: "20px", overflow: "auto" }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
