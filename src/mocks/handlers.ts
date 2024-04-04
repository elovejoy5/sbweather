import { rest } from "msw";
import { apiSuccessJson } from "./test_payloads";

export const handlers = [
  // rest.get(
  //   "https://sbweather-s3-bucket.s3.us-west-2.amazonaws.com/*",
  //   (req, res, ctx) => {
  //     return res(ctx.status(200), ctx.json(apiSuccessJson));
  //   }
  // ),
  rest.get(
    "https://sbweather-s3-bucket.s3.us-west-2.amazonaws.com/*",
    (req, res, ctx) => {
      console.log(
        `TODO: figure out when to pass through requests to s3, and when to redirect to ${apiSuccessJson}`
      );
      return req.passthrough();
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
