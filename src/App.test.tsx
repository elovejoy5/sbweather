import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "./App";
import { MemoryRouter } from "react-router-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ foo: 1 }),
  })
) as jest.Mock;

test("renders learn react link", () => {
  // use <MemoryRouter> when you want to manually control the history
  // https://testing-library.com/docs/example-react-router/
  render(
    <MemoryRouter initialEntries={["/sbweather/"]}>
      <Home />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Santa Barbara Forecast/i);
  expect(linkElement).toBeInTheDocument();
});
