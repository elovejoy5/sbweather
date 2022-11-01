import React from "react";
import { render, screen } from "@testing-library/react";
import { ForecastSummary } from "./ForecastSummary";
import { NwsForecast, getSampleForecast } from "./_getForecast";

it("renders welcome message", () => {
  render(<ForecastSummary forecast={getSampleForecast()} />);
  expect(screen.getByText("Forecast")).toBeInTheDocument();
});
