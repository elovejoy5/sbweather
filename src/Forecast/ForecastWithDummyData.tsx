import { ForecastSummary } from "./ForecastSummary";
import { apiSuccessJson } from "../mocks/test_payloads";

export const ForecastWithDummyData = () => {
  return (
    <div>
      <p>
        Marginially useful local dev hack: load mock data when call to AWS cache
        fails
      </p>
      <h1>Sample Data</h1>
      <ForecastSummary forecast={apiSuccessJson} astronomicalData={[]} />
    </div>
  );
};
