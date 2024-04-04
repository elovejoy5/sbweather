import { fixShortForecast } from "./index";

/**
 * https://www.weather.gov/hfo/New_Product_Help
 * S = Slight Chance (0-20%)
 * C = Chance (30%-50%)
 * L = Likely (60%-70%)
 * O = Occasional/Periods of (80%-100%)
 * D = Definite (80%-100%)
 */

it("fixShortForecast shortens...", () => {
  expect(fixShortForecast("Slight Chance Rain Showers")).toBe("SC Showers");
  expect(fixShortForecast("Chance Rain Showers")).toBe("C Showers");
});

it("fixShortForecast shortens name of days for night forecasts", () => {
  expect(fixShortForecast("Not Changed")).toBe("Not Changed");
});

it("fixShortForecast", () => {
  expect(fixShortForecast("Partly Sunny then Slight Chance Light Rain")).toBe(
    "SC Rain"
  );
  expect(fixShortForecast("Light Rain Likely")).toBe("L Rain");
  expect(fixShortForecast("Chance Light Rain")).toBe("C Rain");
});
