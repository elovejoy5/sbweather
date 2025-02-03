import { ForecastSummary } from "./ForecastSummary";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getForecast } from "./util";
import { getAstronomicalData } from "./util";
import { ForecastWithDummyData } from "./ForecastWithDummyData";
import { expandAstronomicalWeek } from "./util/expandAstronomicalWeek";

export const Forecast = () => {
  const nwsForecast = useQuery({
    queryKey: ["nwsForecast"],
    queryFn: getForecast,
    retry: false,
    gcTime: 300000, // 5 min cache = 1000*60*5
  });

  const astronomicalDataWeek = useQuery({
    queryKey: ["astronomicalDataWeek"],
    queryFn: () =>
      getAstronomicalData({
        latitude: 34.416667,
        longitude: -119.683333,
        startDate: new Date(),
        numberOfDays: 8,
      }),
    retry: false,
    gcTime: 3600000, // 1 hour cache = 1000*60*60
  });

  if (nwsForecast.isPending || astronomicalDataWeek.isPending) {
    return <div>"Loading..."</div>;
  }
  if (
    nwsForecast.isError ||
    nwsForecast.data === undefined ||
    astronomicalDataWeek.data === undefined
  ) {
    console.log(`getForecast returned error: ${nwsForecast.error}`);
    return <ForecastWithDummyData />;
  }

  const expandedWeek = expandAstronomicalWeek(
    astronomicalDataWeek.data,
    nwsForecast.data
  );

  return (
    <div>
      <ForecastSummary
        forecast={nwsForecast.data}
        astronomicalData={expandedWeek}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};
