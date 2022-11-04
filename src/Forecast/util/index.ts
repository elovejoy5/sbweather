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
  if (!stringToFix) {
    return stringToFix;
  }
  if (stringToFix.includes("Slight Chance Rain Showers")) {
    const newString = "S Showers";
    return newString;
  }
  if (stringToFix.includes("Slight Chance Light Rain")) {
    const newString = "S Rain";
    return newString;
  }
  if (stringToFix.includes("Chance Rain Showers")) {
    const newString = "C Showers";
    return newString;
  }
  if (stringToFix.includes("Rain Likely")) {
    const newString = "L Rain";
    return newString;
  }
  if (stringToFix.includes("Chance Light Rain")) {
    return "C Rain";
  }

  return stringToFix;
}
