import { NwsForecast, PeriodForecast, fixName, fixShortForecast } from "./util";
// import { type ExpandedDay } from "./util/expandAstronomicalWeek";
import { TidePredictions } from "./util/getTidePrediction";
import { type AstronomicalEvent } from "./util/getAstronomicalData";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// https://mui.com/material-ui/react-grid2/
// https://mui.com/material-ui/react-card/

interface SunMoonTideCardContentProps {
  AstronomicalEvents: AstronomicalEvent[];
  periodForecast: PeriodForecast;
  tidePredictions: TidePredictions;
}

function SunMoonTideCardContent({
  AstronomicalEvents,
  periodForecast,
  tidePredictions,
}: SunMoonTideCardContentProps) {
  const date = periodForecast.startTime.substring(0, 10);
  // Get all low tides for this date
  const lowTides = tidePredictions.predictions.filter(
    (tide) => tide.type === "L" && tide.t.startsWith(date)
  );
  const sunrise = AstronomicalEvents.filter(
    (event) => event.type === "sunrise" && event.timestamp.startsWith(date)
  );
  const sunset = AstronomicalEvents.filter(
    (event) => event.type === "sunset" && event.timestamp.startsWith(date)
  );

  // Filter low tides by day and night
  // const lowTidesToday = lowTides.filter((tide) => {
  //   const tideTime = new Date(tide.t);
  //   const sunriseTime =
  //     astronomicalDay.sunrise &&
  //     new Date(`${astronomicalDay.dateStamp} ${astronomicalDay.sunrise}`);
  //   const sunsetTime =
  //     astronomicalDay.sunset &&
  //     new Date(`${astronomicalDay.dateStamp} ${astronomicalDay.sunset}`);
  //   return (
  //     sunriseTime &&
  //     sunsetTime &&
  //     tideTime >= sunriseTime &&
  //     tideTime <= sunsetTime
  //   );
  // });

  // const lowTidesTonight = lowTides.filter((tide) => {
  //   const tideTime = new Date(tide.t);
  //   const sunsetTime =
  //     astronomicalDay.sunset &&
  //     new Date(`${astronomicalDay.dateStamp} ${astronomicalDay.sunset}`);
  //   return sunsetTime && tideTime > sunsetTime;
  // });

  return (
    <CardContent sx={{ py: 1, zIndex: "modal" }}>
      {sunrise && (
        <Typography variant="caption" display="block">
          {"sunrise: " + JSON.stringify(sunrise)}
        </Typography>
      )}
      {sunset && (
        <Typography variant="caption" display="block">
          {"sunset: " + JSON.stringify(sunset)}
        </Typography>
      )}
      {lowTides && (
        <Typography variant="caption" display="block">
          {"Low tides: " + lowTides.map((t) => t.t.split(" ")[1]).join(", ")}
        </Typography>
      )}
    </CardContent>
  );
}

export const ForecastSummary = ({
  forecast,
  astronomicalData,
  tidePredictions,
}: {
  forecast: NwsForecast;
  astronomicalData: AstronomicalEvent[];
  tidePredictions: TidePredictions;
}) => {
  const forecasts = forecast?.properties?.periods;
  if (!forecast || (Array.isArray(forecast) && forecast.length === 0)) {
    return <div>Sorry, forecast does not appear to have loaded</div>;
  }
  return (
    <div style={{ margin: "10px", paddingBottom: "3em" }}>
      <Grid container spacing={1}>
        {forecasts?.map((fc, i) => {
          const name = fixName(fc?.name);
          const shortForecast = fixShortForecast(fc?.shortForecast);
          return (
            <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2 }} key={i}>
              <Card sx={{ height: "100%", position: "relative" }}>
                <CardHeader
                  title={name}
                  subheader={shortForecast}
                  sx={{
                    "& .MuiCardHeader-subheader": {
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "90%",
                    },
                  }}
                />
                <CardMedia component="img" image={fc?.icon} alt={fc?.name} />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: "4.5em",
                    left: 0,
                    right: 0,
                    color: "white",
                    padding: 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      padding: "0.5em",
                    }}
                  >
                    {fc?.detailedForecast}
                  </Typography>
                </CardContent>
                <SunMoonTideCardContent
                  AstronomicalEvents={astronomicalData}
                  periodForecast={fc}
                  tidePredictions={tidePredictions}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
