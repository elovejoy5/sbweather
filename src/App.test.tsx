import React from "react";
import { render, screen } from "@testing-library/react";
import { AppRoutes } from "./App";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ foo: 1 }),
  })
) as jest.Mock;

const queryClient = new QueryClient();

test("App can render without blowing up", () => {
  // TODO: https://tanstack.com/query/v4/docs/guides/testing
  // use <MemoryRouter> when you want to manually control the history
  // https://testing-library.com/docs/example-react-router/
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/sbweather/"]}>
        <AppRoutes />
      </MemoryRouter>
    </QueryClientProvider>
  );
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});

test.todo("show data if query succeeds");
test.todo("show dummy data if query fails");
