import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ foo: 1 }),
  })
) as jest.Mock;

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Santa Barbara Forecast/i);
  expect(linkElement).toBeInTheDocument();
});
