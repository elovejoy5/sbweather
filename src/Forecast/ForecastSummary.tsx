import { NwsForecast, PeriodForecast, fixName, fixShortForecast } from "./util";
import { AstronomicalDay } from "./util/getAstronomicalData";
import { TidePredictions } from "./util/getTidePrediction";
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

export const ForecastSummary = ({
  forecast,
  astronomicalData,
  tidePredictions,
}: {
  forecast: NwsForecast;
  astronomicalData: AstronomicalDay[];
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
                  astronomicalDay={astronomicalData[i]}
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

function SunMoonTideCardContent({
  astronomicalDay,
  periodForecast,
  tidePredictions,
}: {
  astronomicalDay: AstronomicalDay;
  periodForecast: PeriodForecast;
  tidePredictions: TidePredictions;
}) {
  const lowTides = tidePredictions.predictions.filter(
    (tide) => tide.type === "L" && tide.t.includes(astronomicalDay.dateStamp)
  );
  return (
    <CardContent
      sx={{
        py: 1,
        zIndex: "modal",
      }}
    >
      {periodForecast?.isDaytime ? (
        <>
          <Typography variant="caption" display="block">
            {"sunrise: " + astronomicalDay?.sunrise}
          </Typography>
          <Typography variant="caption" display="block">
            {"sunset: " + astronomicalDay?.sunset}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="caption" display="block">
            {astronomicalDay?.moonPhase}
          </Typography>
          <Typography variant="caption" display="block">
            {astronomicalDay?.dateStamp}:{JSON.stringify(lowTides)}
          </Typography>
        </>
      )}
    </CardContent>
  );
}
