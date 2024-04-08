import axios from "axios";
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
  // const url = "https://api.weather.gov/gridpoints/LOX/103,70/forecast"; // santa barbara
  const s3Domain = "https://sbweather-s3-bucket.s3.us-west-2.amazonaws.com/";
  const todayFilename = new Date().toISOString().substring(0, 10) + ".json";
  var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const yesterdayFilename = yesterday.toISOString().substring(0, 10) + ".json";
  const todayUrl = s3Domain + todayFilename;
  const yesterdayUrl = s3Domain + yesterdayFilename;
  // const url = "https://api.weather.gov/gridpoints/LOX/102,69/forecast"; // ocean, should generate 404

  let todayResponse = { status: 0, data: {} },
    yesterdayResponse = { status: 0, data: {} };
  try {
    todayResponse = await axios.get(todayUrl);
  } catch (error: any) {
    /**
     * currently one json file is created for each date (will be overwritten a few times a day)
     * This means that in the afternoon PT, a check for TODAY_DATE.json will return 404
     * And getForecast needs to grab yesterday's file instead
     */
    yesterdayResponse = await axios.get(yesterdayUrl);
  }
  return new Promise((resolve, reject) => {
    if (todayResponse.status === 200) {
      const prettyJson = JSON.stringify(todayResponse.data, null, 2);
      const sbweatherDebug = Boolean(localStorage.getItem("sbweatherDebug"));
      const apiCallDescription = sbweatherDebug
        ? `getForecast() called, status: ${todayResponse.status}, responseJson: \n` +
          prettyJson
        : `getForecast() called, status: ${todayResponse.status}`;
      console.log(apiCallDescription);
      resolve(todayResponse.data);
    }
    if (yesterdayResponse.status === 200) {
      const prettyJson = JSON.stringify(yesterdayResponse.data, null, 2);
      const sbweatherDebug = Boolean(localStorage.getItem("sbweatherDebug"));
      const apiCallDescription = sbweatherDebug
        ? `getForecast() called, yesterdayStatus: ${yesterdayResponse.status}, responseJson: \n` +
          prettyJson
        : `getForecast() called, yesterdayStatus: ${yesterdayResponse.status}`;
      console.log(apiCallDescription);
      resolve(yesterdayResponse.data);
    }
    // if (axios.isAxiosError(error)) {
    //   const status = error?.response?.status;
    //   console.log(
    //     `call to ${todayUrl} returned status: ${status}, response: \n`
    //   );
    //   console.log(error.response);
    //   reject({ status: status });
    // }
    // console.log(
    //   `getForecast() called, todayUrl is:\n\t${todayUrl} \nyesterdayUrl is \n\t${yesterdayUrl}`,
    //   `todayStatus is ${todayStatus}`,
    //   `yesterdayData is ${yesterdayData}`
    // );
    reject({ status: 500 });
  });
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
