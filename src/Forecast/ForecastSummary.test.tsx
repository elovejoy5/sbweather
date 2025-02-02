import { screen, render } from "../utils/test-utils";
import { ForecastSummary } from "./ForecastSummary";
import { getSampleForecast } from "./util";

it("renders shortForecast && detailed forecast when getting at least one forecast", () => {
  render(<ForecastSummary forecast={getSampleForecast()} />);
  expect(
    screen.getByText(
      "Patchy fog between 11pm and 5am. Mostly cloudy, with a low around 54. East northeast wind 5 to 10 mph."
    )
  ).toBeInTheDocument();
  expect(screen.getByText("Patchy Fog")).toBeInTheDocument();
});

/**
 * The @ts-ignores here make me think these tests are wrong in some way
 * at some point figuring out what happens when API calls fail to load a forecast will be good:
 */
it("renders error when arg undefined", () => {
  // @ts-ignore: Type 'undefined' is not assignable to type 'NwsForecast'
  render(<ForecastSummary forecast={undefined} />);
  expect(
    screen.getByText("Sorry, forecast does not appear to have loaded")
  ).toBeInTheDocument();
});

it("renders error when arg []", () => {
  // @ts-ignore: Type 'never[]' has no properties in common with type 'NwsForecast'
  render(<ForecastSummary forecast={[]} />);
  expect(
    screen.getByText("Sorry, forecast does not appear to have loaded")
  ).toBeInTheDocument();
});
