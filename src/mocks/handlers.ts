import { rest } from "msw";
import { apiSuccessJson } from "./test_payloads";

export const handlers = [
  rest.get(
    "https://api.weather.gov/gridpoints/LOX/102,69/forecast",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(apiSuccessJson));
    }
  ),
];
