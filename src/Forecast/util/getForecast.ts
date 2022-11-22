/**
 * getForecast() will fetch a forecast which has interface `NwsForecast`
 *  - Note: needs to be mocked by some tests to avoid API calls when Jest runs
 *
 * getSampleForecast() can be used by tests
 */
interface PeriodForecast {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: null | string;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

interface Properties {
  periods: PeriodForecast[];
}

export interface NwsForecast {
  status?: number;
  properties?: Properties;
}

export async function getForecast(): Promise<NwsForecast> {
  /**
   * Note: may need to set a custom User Agent in the future. API docs say (urls below):
   *   A User Agent is required to identify your application.
   *   If you include contact information (website or email), we can contact you if your string
   *   is associated to a security event. This will be replaced with an API key in the future.
   */

  const response = await fetch(
    "https://api.weather.gov/gridpoints/LOX/102,69/forecast"
  );

  console.log(
    "getForecast() called, process.env.NODE_ENV: ",
    process.env.NODE_ENV
  );

  return response.json();
}

/**

https://www.weather.gov/documentation/services-web-api

If you do not know the grid that correlates to your location, you can use the /points endpoint to retrieve the exact grid endpoint by coordinates:
https://api.weather.gov/points/34.3985,-119.7498
(This is how to figure out to call /LOX/102,69/ for Santa Barbara )


Forecasts are divided into 2.5km grids. Each NWS office is responsible for a section of the grid. The API endpoint for the forecast at a specific grid is:

https://api.weather.gov/gridpoints/{office}/{grid X},{grid Y}/forecast
https://api.weather.gov/gridpoints/LOX/102,69/forecast

 */

export const getSampleForecast = (): NwsForecast => ({
  properties: {
    periods: [
      {
        number: 1,
        name: "Tonight",
        startTime: "2022-10-31T20:00:00-07:00",
        endTime: "2022-11-01T06:00:00-07:00",
        isDaytime: false,
        temperature: 54,
        temperatureUnit: "F",
        temperatureTrend: null,
        windSpeed: "5 to 10 mph",
        windDirection: "ENE",
        icon: "https://api.weather.gov/icons/land/night/fog?size=medium",
        shortForecast: "Patchy Fog",
        detailedForecast:
          "Patchy fog between 11pm and 5am. Mostly cloudy, with a low around 54. East northeast wind 5 to 10 mph.",
      },
    ],
  },
});
