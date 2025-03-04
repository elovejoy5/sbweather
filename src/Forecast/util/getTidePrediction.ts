import axios from "axios";

interface TidePrediction {
  t: string; // timestamp in format "YYYY-MM-DD HH:MM"
  v: string; // tide height in meters
  type: "H" | "L"; // H for high tide, L for low tide
}

export interface TidePredictions {
  predictions: TidePrediction[];
}

export async function getTidePrediction(): Promise<TidePredictions> {
  const s3Domain = "https://sbweather-s3-bucket.s3.us-west-2.amazonaws.com/";
  const today = new Date();
  const filename = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-tides.json`;
  const url = s3Domain + filename;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const sbweatherDebug = Boolean(localStorage.getItem("sbweatherDebug"));
      if (sbweatherDebug) {
        const prettyJson = JSON.stringify(response.data, null, 2);
        console.log(
          `getTidePrediction() called, status: ${response.status}, responseJson: \n${prettyJson}`
        );
      } else {
        console.log(`getTidePrediction() called, status: ${response.status}`);
      }
      return response.data;
    }
    throw new Error(`Failed to fetch tide data: ${response.status}`);
  } catch (error) {
    console.error("Error fetching tide predictions:", error);
    throw new Error(`Failed to fetch tide data: ${error}`);
  }
}
