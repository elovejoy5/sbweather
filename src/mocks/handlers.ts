import { rest } from "msw";
import { apiSuccessJson } from "./test_payloads";

export const handlers = [
  rest.get(
    "https://api.weather.gov/gridpoints/LOX/103,70/forecast",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(apiSuccessJson));
    }
  ),
  /**
   * static assets should mostly passthrough:
   */
  rest.get("/sbweather/static/*", (req, res, ctx) => {
    return req.passthrough();
  }),
  rest.get("/sbweather/logo192.png", (req, res, ctx) => {
    return req.passthrough();
  }),
  rest.get("https://api.weather.gov/icons/*", (req, res, ctx) => {
    return req.passthrough();
  }),
];
