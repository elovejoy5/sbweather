import axios from "axios";

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

export async function fetchLocations(): Promise<Location[]> {
  try {
    const response = await axios.get<Location[]>("/api/locations");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch locations: ${error.message}`);
    }
    throw error;
  }
}
