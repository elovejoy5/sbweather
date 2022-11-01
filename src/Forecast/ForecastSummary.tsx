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

/**
 * TODO:
 * - Tests for no cards, one card, full set of cards
 */

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
        {forecasts?.map((fc, i) => (
          //https://mui.com/material-ui/react-grid/
          <Grid item key={i} xs={6} sm={4} md={2} lg={1}>
            {/* https://mui.com/material-ui/api/card/ */}
            <Card sx={{ height: "100%" }} key={i}>
              <CardHeader title={fc?.name} subheader={fc?.shortForecast} />
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
        ))}
      </Grid>
      {/* <h2>All:</h2>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(forecast, null, 2)}
      </pre> */}
    </div>
  );
};
