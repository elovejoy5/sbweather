import SunCalc from "suncalc";

interface GetAstronomicalDataParams {
  latitude: number;
  longitude: number;
  startDate: Date;
  numberOfDays: number;
}

export interface AstronomicalDay {
  displayDate: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
}

export async function getAstronomicalData({
  latitude,
  longitude,
  startDate,
  numberOfDays,
}: GetAstronomicalDataParams): Promise<AstronomicalDay[]> {
  const formatTime = (time: Date): string =>
    time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const getMoonPhaseName = (phase: number): string => {
    if (phase < 0.05) return "New Moon";
    if (phase < 0.25) return "Waxing Crescent";
    if (phase < 0.3) return "First Quarter";
    if (phase < 0.45) return "Waxing Gibbous";
    if (phase < 0.55) return "Full Moon";
    if (phase < 0.7) return "Waning Gibbous";
    if (phase < 0.8) return "Last Quarter";
    return "Waning Crescent";
  };

  return Array.from({ length: numberOfDays }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);

    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude);
    const moonIllumination = SunCalc.getMoonIllumination(date);

    return {
      displayDate: `${date.toLocaleDateString("en-US", {
        weekday: "long",
      })} ${date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`,
      sunrise: formatTime(sunTimes.sunrise),
      sunset: formatTime(sunTimes.sunset),
      moonrise: moonTimes.rise ? formatTime(moonTimes.rise) : "Not Visible",
      moonset: moonTimes.set ? formatTime(moonTimes.set) : "Not Visible",
      moonPhase: getMoonPhaseName(moonIllumination.phase),
    };
  });
}
