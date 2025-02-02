import { NwsForecast, fixName, fixShortForecast } from "./util";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

// https://mui.com/material-ui/react-grid/
// https://mui.com/material-ui/react-card/

export const ForecastSummary = ({ forecast }: { forecast: NwsForecast }) => {
  const forecasts = forecast?.properties?.periods;
  if (!forecast || (Array.isArray(forecast) && forecast.length === 0)) {
    return <div>Sorry, forecast does not appear to have loaded</div>;
  }
  return (
    <div style={{ margin: "10px", paddingBottom: "3em" }}>
      <Grid container spacing={1} alignItems="stretch">
        {forecasts?.map((fc, i) => {
          const name = fixName(fc?.name);
          const shortForecast = fixShortForecast(fc?.shortForecast);
          return (
            <Grid item key={i} xs={6} sm={4} md={2} lg={2}>
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
    </div>
  );
};
