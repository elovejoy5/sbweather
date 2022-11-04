import { fixName } from "./index";

it("fixName shortens name of days for night forecasts", () => {
  expect(fixName("Monday Night")).toBe("Mon Night");
  expect(fixName("Tuesday Night")).toBe("Tue Night");
  expect(fixName("Wednesday Night")).toBe("Wed Night");
  expect(fixName("Thursday Night")).toBe("Thu Night");
  expect(fixName("Friday Night")).toBe("Fri Night");
  expect(fixName("Saturday Night")).toBe("Sat Night");
  expect(fixName("Sunday Night")).toBe("Sun Night");
});

it("fixName shortens name of days for night forecasts", () => {
  expect(fixName("Not Changed")).toBe("Not Changed");
});
