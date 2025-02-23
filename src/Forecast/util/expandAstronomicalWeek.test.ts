import { expandAstronomicalWeek } from "./expandAstronomicalWeek";
import { getSampleForecast } from "./getWxForecast";

const week = [
  {
    dateStamp: "2025-01-01",
    displayDate: "one",
    sunrise: "oneRise",
    sunset: "oneSet",
    moonPhase: "oneMoon",
    moonrise: "oneMoonrise",
    moonset: "oneMoonset",
  },
  {
    dateStamp: "2025-01-02",
    displayDate: "two",
    sunrise: "twoRise",
    sunset: "twoSet",
    moonPhase: "twoMoon",
    moonrise: "twoMoonrise",
    moonset: "twoMoonset",
  },
];

const forecastStartsWithDay = getSampleForecast();
if (forecastStartsWithDay && forecastStartsWithDay.properties) {
  forecastStartsWithDay.properties.periods[0].isDaytime = true;
}
const forecastStartsWithNight = getSampleForecast();
if (forecastStartsWithNight && forecastStartsWithNight.properties) {
  forecastStartsWithNight.properties.periods[0].isDaytime = false;
}

describe.skip("expandAstronomicalWeek", () => {
  it("starts with day should return first moon phase in second object", () => {
    // const result = expandAstronomicalWeek(week, forecastStartsWithDay);
    // expect(result[0].sunrise).toEqual("oneRise");
    // expect(result[1].moonPhase).toEqual("oneMoon");
    // expect(result[2].sunrise).toEqual("twoRise");
    // expect(result[3].moonPhase).toEqual("twoMoon");
  });
  it("starts with night should return first moon phase in first object", () => {
    // const result = expandAstronomicalWeek(week, forecastStartsWithNight);
    // expect(result[0].moonPhase).toEqual("oneMoon");
    // expect(result[1].sunrise).toEqual("twoRise");
    // expect(result[2].moonPhase).toEqual("twoMoon");
  });
});
