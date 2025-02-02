import { NwsForecast, fixName, fixShortForecast } from "./util";

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

export const ForecastSummary = ({ forecast }: { forecast: NwsForecast }) => {
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
              <Card sx={{ height: "100%" }}>
                <CardHeader title={name} subheader={shortForecast} />
                <CardMedia component="img" image={fc?.icon} alt={fc?.name} />
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
