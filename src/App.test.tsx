import React from "react";
import { render, screen } from "./utils/test-utils";
import { AppRoutes } from "./App";

test("App can render without blowing up", () => {
  render(<AppRoutes />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
