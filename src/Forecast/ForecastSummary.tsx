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

/**
 *
 * ForecastSummary renders a card for each forecast period
 * SunMoonTideCardContent appends tide and astronomical events to bottom of each card
 *
 */
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
                    bottom: "5.5em",
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
  let captions = [];
  /**
   * Day card? add sunrise, sunset, and low tides:
   */
  if (periodForecast.isDaytime) {
    const sunrise = AstronomicalEvents.find(
      (event) =>
        event.type === "sunrise" && event.timestampLocal.startsWith(date)
    );
    if (sunrise?.timestampLocal) {
      const sunriseString =
        "sunrise: " + new Date(sunrise.timestampLocal).toLocaleTimeString();
      captions.push(sunriseString);
    }
    const sunset = AstronomicalEvents.find(
      (event) =>
        event.type === "sunset" && event.timestampLocal.startsWith(date)
    );
    if (sunset?.timestampLocal) {
      const sunsetString =
        "sunset: " + new Date(sunset.timestampLocal).toLocaleTimeString();
      captions.push(sunsetString);
    }
    const lowTides = tidePredictions.predictions.filter(
      (tide) => tide.type === "L" && tide.t.startsWith(date)
    );
    // tide predictions look like:
    // {"t":"2025-02-01 05:01","v":"1.381","type":"L"}
    captions.push(
      "Low tides: " +
        lowTides.map((t) => t.v + "@" + t.t.split(" ")[1]).join(", ")
    );
  }
  /**
   * Night card? add moonrise, moonset:
   */
  if (!periodForecast.isDaytime) {
    let moonPhase = 0;
    const moonrise = AstronomicalEvents.find(
      (event) =>
        event.type === "moonrise" && event.timestampLocal.startsWith(date)
    );
    if (moonrise?.timestampLocal) {
      const moonriseString =
        "moonrise: " + new Date(moonrise.timestampLocal).toLocaleTimeString();
      captions.push(moonriseString);
      if (moonrise.moonPhase) {
        moonPhase = moonrise.moonPhase;
      }
    }
    const moonset = AstronomicalEvents.find(
      (event) =>
        event.type === "moonset" && event.timestampLocal.startsWith(date)
    );
    if (moonset?.timestampLocal) {
      const moonsetString =
        "moonset: " + new Date(moonset.timestampLocal).toLocaleTimeString();
      captions.push(moonsetString);
      if (moonset.moonPhase) {
        moonPhase = moonset.moonPhase;
      }
    }
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
    captions.push(getMoonPhaseName(moonPhase));
  }

  return (
    <CardContent sx={{ py: 1, zIndex: "modal" }}>
      {captions.map((c, i) => (
        <Typography variant="caption" display="block" key={i}>
          {c}
        </Typography>
      ))}
    </CardContent>
  );
}
