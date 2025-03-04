import { useQuery } from "@tanstack/react-query";
import { getWxForecast } from "../util/getWxForecast";

export function WeatherForecastData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["forecast"],
    queryFn: getWxForecast,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading forecast</div>;

  return (
    <div style={{ margin: "10px", overflow: "auto" }}>
      <h1>Weather Forecast Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
