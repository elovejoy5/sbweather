import { useQuery } from "@tanstack/react-query";
import { getTidePrediction } from "../util/getTidePrediction";
import { Typography, Paper } from "@mui/material";

export function TideData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tidePredictions"],
    queryFn: getTidePrediction,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tide data</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Tide Data
      </Typography>
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
      >
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Paper>
    </div>
  );
}
