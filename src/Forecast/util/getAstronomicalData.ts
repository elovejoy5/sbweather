import SunCalc from "suncalc";

interface GetAstronomicalDataParams {
  latitude: number;
  longitude: number;
  startDate: Date;
  numberOfDays: number;
  utcOffset?: number; // offset in minutes, default -480 (PST)
}

export type AstronomicalEventType =
  | "sunrise"
  | "sunset"
  | "moonrise"
  | "moonset";

export interface AstronomicalEvent {
  timestamp: string; // ISO timestamp with UTC offset
  timestampLocal: string; // ISO timestamp with local offset
  type: AstronomicalEventType;
  moonPhase?: number; // 0-1, only present for moonrise/moonset events
}

function formatTimestampWithOffset(
  date: Date,
  offsetMinutes: number = -480
): string {
  // use stack overflow recip to get local timestamp
  // https://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript?noredirect=1&lq=1
  var tzo = offsetMinutes,
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num: number) {
      return (num < 10 ? "0" : "") + num;
    };

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ":" +
    pad(Math.abs(tzo) % 60)
  );
}

export async function getAstronomicalData({
  latitude,
  longitude,
  startDate,
  numberOfDays,
  utcOffset = -480, // default to PST (-8 hours)
}: GetAstronomicalDataParams): Promise<AstronomicalEvent[]> {
  const events: AstronomicalEvent[] = [];

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Get sun and moon data for this day
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude);
    const moonIllumination = SunCalc.getMoonIllumination(date);

    // Add sunrise and sunset events
    events.push({
      timestamp: sunTimes.sunrise.toISOString(),
      timestampLocal: formatTimestampWithOffset(sunTimes.sunrise, utcOffset),
      type: "sunrise",
    });

    events.push({
      timestamp: sunTimes.sunset.toISOString(),
      timestampLocal: formatTimestampWithOffset(sunTimes.sunset, utcOffset),
      type: "sunset",
    });

    // Add moonrise and moonset events if visible
    if (moonTimes.rise) {
      events.push({
        timestamp: moonTimes.rise.toISOString(),
        timestampLocal: formatTimestampWithOffset(moonTimes.rise, utcOffset),
        type: "moonrise",
        moonPhase: moonIllumination.phase,
      });
    }

    if (moonTimes.set) {
      events.push({
        timestamp: moonTimes.set.toISOString(),
        timestampLocal: formatTimestampWithOffset(moonTimes.set, utcOffset),
        type: "moonset",
        moonPhase: moonIllumination.phase,
      });
    }
  }

  // Sort events chronologically
  return events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}
