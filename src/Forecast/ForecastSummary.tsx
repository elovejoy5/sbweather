import React from "react";
import { NwsForecast } from "./_getForecast";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

// https://mui.com/material-ui/react-card/

export const ForecastSummary = ({ forecast }: { forecast: NwsForecast }) => {
  const forecasts = forecast?.properties?.periods;
  if (!forecast || (Array.isArray(forecast) && forecast.length === 0)) {
    return <div>Sorry, forecast does not appear to have loaded</div>;
  }
  return (
    <div>
      {/* <h1>Forecast</h1>
      <h2>Now:</h2>
      <pre style={{ textAlign: "left" }}>{JSON.stringify(fc, null, 2)}</pre> */}
      <Grid container spacing={1} alignItems="stretch">
        {forecasts?.map((fc, i) => {
          const name = fixName(fc?.name);
          const shortForecast = fixShortForecast(fc?.shortForecast);
          return (
            //https://mui.com/material-ui/react-grid/
            <Grid item key={i} xs={6} sm={4} md={2} lg={1}>
              {/* https://mui.com/material-ui/api/card/ */}
              <Card sx={{ height: "100%" }} key={i}>
                <CardHeader title={name} subheader={shortForecast} />
                <CardMedia
                  component="img"
                  // height={86 * 2}
                  image={fc?.icon}
                  alt={fc?.name}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {fc?.detailedForecast}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {/* <h2>All:</h2>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(forecast, null, 2)}
      </pre> */}
    </div>
  );
};

/**
 * quick-and-dirty helper functions to prevent name and shortForecast from wrapping
 * which makes cards look funny
 */
function fixName(nameToFix: string | undefined) {
  console.log(`nameToFix: "${nameToFix}" `);
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
    console.log(`name shortened from "${nameToFix}" to "${shorterName}"`);
    return shorterName;
  }
  return nameToFix;
}

function fixShortForecast(stringToFix: string | undefined) {
  if (!stringToFix) {
    return stringToFix;
  }
  /**
   * https://www.weather.gov/hfo/New_Product_Help
   * S = Slight Chance (0-20%)
   * C = Chance (30%-50%)
   * L = Likely (60%-70%)
   * O = Occasional/Periods of (80%-100%)
   * D = Definite (80%-100%)
   */
  if (stringToFix.includes("Slight Chance Rain Showers")) {
    const newString = "S Showers";
    console.log(`name shortened from "${stringToFix}" to "${newString}"`);
    return newString;
  }
  if (stringToFix.includes("Chance Rain Showers")) {
    const newString = "C Showers";
    console.log(`name shortened from "${stringToFix}" to "${newString}"`);
    return newString;
  }
  return stringToFix;
}
