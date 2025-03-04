import axios from "axios";

export interface PeriodForecast {
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

export async function getWxForecast(): Promise<NwsForecast> {
  const s3Domain = "https://sbweather-s3-bucket.s3.us-west-2.amazonaws.com/";
  const todayFilename = new Date().toISOString().substring(0, 10) + ".json";
  var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const yesterdayFilename = yesterday.toISOString().substring(0, 10) + ".json";
  const todayUrl = s3Domain + todayFilename;
  const yesterdayUrl = s3Domain + yesterdayFilename;

  let todayResponse = { status: 0, data: {} },
    yesterdayResponse = { status: 0, data: {} };
  try {
    todayResponse = await axios.get(todayUrl);
  } catch (error: any) {
    yesterdayResponse = await axios.get(yesterdayUrl);
  }
  return new Promise((resolve, reject) => {
    if (todayResponse.status === 200) {
      const prettyJson = JSON.stringify(todayResponse.data, null, 2);
      const sbweatherDebug = Boolean(localStorage.getItem("sbweatherDebug"));
      const apiCallDescription = sbweatherDebug
        ? `getWxForecast() called, status: ${todayResponse.status}, responseJson: \n` +
          prettyJson
        : `getWxForecast() called, status: ${todayResponse.status}`;
      console.log(apiCallDescription);
      resolve(todayResponse.data);
    }
    if (yesterdayResponse.status === 200) {
      const prettyJson = JSON.stringify(yesterdayResponse.data, null, 2);
      const sbweatherDebug = Boolean(localStorage.getItem("sbweatherDebug"));
      const apiCallDescription = sbweatherDebug
        ? `getWxForecast() called, yesterdayStatus: ${yesterdayResponse.status}, responseJson: \n` +
          prettyJson
        : `getWxForecast() called, yesterdayStatus: ${yesterdayResponse.status}`;
      console.log(apiCallDescription);
      resolve(yesterdayResponse.data);
    }
    reject({ status: 500 });
  });
}

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
