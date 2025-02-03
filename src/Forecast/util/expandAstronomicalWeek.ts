import { AstronomicalDay } from "./getAstronomicalData";
import { NwsForecast } from "./getForecast";

export function expandAstronomicalWeek(
  astronomicalData: AstronomicalDay[],
  forecast: NwsForecast
): AstronomicalDay[] {
  const startsWithDay = forecast.properties?.periods[0]?.isDaytime;
  const result: AstronomicalDay[] = [];

  astronomicalData.forEach((day, index) => {
    if (!startsWithDay && index === 0) {
      // special case: forecast starts with night,
      // do not need to expand first day:
      result.push({
        ...day,
      });
    } else {
      // Default case: each day expanded into day and night
      result.push({
        ...day,
      });
      result.push({
        ...day,
      });
    }
  });

  return result;
}
