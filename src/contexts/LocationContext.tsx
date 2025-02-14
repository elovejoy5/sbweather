import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { Location, fetchLocations } from "../api/locations";

interface LocationContextType {
  location: Location;
  setLocation: (location: Location) => void;
  availableLocations: Location[];
  isLoading: boolean;
  error: Error | null;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const {
    data: availableLocations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });

  const [location, setLocation] = useState<Location | null>(null);

  // Set initial location when data loads
  useEffect(() => {
    if (availableLocations.length > 0 && !location) {
      setLocation(availableLocations[0]);
    }
  }, [availableLocations, location]);

  // Don't render children until we have initial location
  if (isLoading || !location) {
    return <div>Loading locations...</div>;
  }

  if (error) {
    return <div>Error loading locations: {error.message}</div>;
  }

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        availableLocations,
        isLoading,
        error,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
