import { AstronomicalEvent } from "./getAstronomicalData";
import { NwsForecast } from "./getWxForecast";

interface DayEvents {
  dateStamp: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: number;
}

export interface ExpandedDay {
  dateStamp: string;
  sunrise?: string;
  sunset?: string;
  moonrise?: string;
  moonset?: string;
  moonPhase?: number;
}

function groupEventsByDay(events: AstronomicalEvent[]): DayEvents[] {
  const dayMap = new Map<string, DayEvents>();

  events.forEach((event) => {
    const date = new Date(event.timestamp);
    const dateStamp = date.toISOString().substring(0, 10);
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (!dayMap.has(dateStamp)) {
      dayMap.set(dateStamp, {
        dateStamp,
        sunrise: "",
        sunset: "",
        moonrise: "",
        moonset: "",
        moonPhase: 0,
      });
    }

    const dayData = dayMap.get(dateStamp)!;

    switch (event.type) {
      case "sunrise":
        dayData.sunrise = timeStr;
        break;
      case "sunset":
        dayData.sunset = timeStr;
        break;
      case "moonrise":
        dayData.moonrise = timeStr;
        dayData.moonPhase = event.moonPhase || 0;
        break;
      case "moonset":
        dayData.moonset = timeStr;
        dayData.moonPhase = event.moonPhase || 0;
        break;
    }
  });

  return Array.from(dayMap.values());
}

export function expandAstronomicalWeek(
  astronomicalEvents: AstronomicalEvent[],
  forecast: NwsForecast
): ExpandedDay[] {
  const startsWithDay = forecast.properties?.periods[0]?.isDaytime;
  const days = groupEventsByDay(astronomicalEvents);
  const result: ExpandedDay[] = [];

  days.forEach((day, index) => {
    if (!startsWithDay && index === 0) {
      // Special case: forecast starts with night
      result.push({
        dateStamp: day.dateStamp,
        moonrise: day.moonrise,
        moonset: day.moonset,
        moonPhase: day.moonPhase,
      });
    } else {
      // Day entry
      result.push({
        dateStamp: day.dateStamp,
        sunrise: day.sunrise,
        sunset: day.sunset,
      });
      // Night entry
      result.push({
        dateStamp: day.dateStamp,
        moonrise: day.moonrise,
        moonset: day.moonset,
        moonPhase: day.moonPhase,
      });
    }
  });

  return result;
}
