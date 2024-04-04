export * from "./getForecast";

/**
 * quick-and-dirty helper functions to prevent name and shortForecast from wrapping
 * which messes up vertical alignment of cards
 */
export function fixName(nameToFix: string | undefined) {
  if (!nameToFix) {
    return nameToFix;
  }
  if (nameToFix.includes("Night")) {
    // shorten name if it includes Night
    let shorterName = nameToFix.replace("Monday", "Mon");
    shorterName = shorterName.replace("Tuesday", "Tue");
    shorterName = shorterName.replace("Wednesday", "Wed");
    shorterName = shorterName.replace("Thursday", "Thu");
    shorterName = shorterName.replace("Friday", "Fri");
    shorterName = shorterName.replace("Saturday", "Sat");
    shorterName = shorterName.replace("Sunday", "Sun");
    return shorterName;
  }
  return nameToFix;
}

export function fixShortForecast(stringToFix: string | undefined) {
  switch (stringToFix) {
    case "Slight Chance Light Rain":
    case "Partly Sunny then Slight Chance Light Rain":
      return "SC Rain";
    case "Chance Light Rain":
      return "C Rain";
    case "Rain Likely":
    case "Light Rain Likely":
      return "L Rain";
    case "Slight Chance Rain Showers":
      return "SC Showers";
    case "Chance Rain Showers":
      return "C Showers";
    case "Chance Showers And Thunderstorms":
      return "C Showers & TS";
    case "Slight Chance Showers And Thunderstorms then Partly Cloudy":
      return "SC Showers & TS";
    default:
      return stringToFix;
  }
}
