import React from "react";
import { render, screen } from "@testing-library/react";
import { AppRoutes } from "./App";
import { MemoryRouter } from "react-router-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ foo: 1 }),
  })
) as jest.Mock;

test("App can render without blowing up", () => {
  // use <MemoryRouter> when you want to manually control the history
  // https://testing-library.com/docs/example-react-router/
  render(
    <MemoryRouter initialEntries={["/sbweather/"]}>
      <AppRoutes />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Santa Barbara Forecast/i);
  expect(linkElement).toBeInTheDocument();
});
