import SunCalc from "suncalc";

interface GetAstronomicalDataParams {
  latitude: number;
  longitude: number;
  startDate: Date;
  numberOfDays: number;
}

export type AstronomicalEventType =
  | "sunrise"
  | "sunset"
  | "moonrise"
  | "moonset";

export interface AstronomicalEvent {
  timestamp: string; // ISO timestamp
  type: AstronomicalEventType;
  moonPhase?: number; // 0-1, only present for moonrise/moonset events
}

export async function getAstronomicalData({
  latitude,
  longitude,
  startDate,
  numberOfDays,
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
      type: "sunrise",
    });

    events.push({
      timestamp: sunTimes.sunset.toISOString(),
      type: "sunset",
    });

    // Add moonrise and moonset events if visible
    if (moonTimes.rise) {
      events.push({
        timestamp: moonTimes.rise.toISOString(),
        type: "moonrise",
        moonPhase: moonIllumination.phase,
      });
    }

    if (moonTimes.set) {
      events.push({
        timestamp: moonTimes.set.toISOString(),
        type: "moonset",
        moonPhase: moonIllumination.phase,
      });
    }
  }

  // Sort events chronologically
  return events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}
