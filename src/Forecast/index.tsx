import { ForecastSummary } from "./ForecastSummary";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getForecast } from "./util";
import { ForecastWithDummyData } from "./ForecastWithDummyData";

export const Forecast = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["nwsForecast"],
    queryFn: getForecast,
    retry: false,
    gcTime: 300000, // 5 min cache = 1000*60*5
  });

  if (isPending) return <div>"Loading..."</div>;

  if (isError || data === undefined) {
    console.log(`getForecast returned error: ${error}`);
    return <ForecastWithDummyData />;
  }

  return (
    <div>
      <ForecastSummary forecast={data} />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};
