import { FormControl, Select, MenuItem, CircularProgress } from "@mui/material";
import { useLocation } from "../contexts/LocationContext";

export function LocationSelector() {
  const { location, setLocation, availableLocations, isLoading } =
    useLocation();

  if (isLoading) {
    return <CircularProgress size={24} sx={{ marginLeft: 2 }} />;
  }

  return (
    <FormControl size="small" sx={{ minWidth: 200, marginLeft: 2 }}>
      <Select
        value={location.id}
        onChange={(e) => {
          const newLocation = availableLocations.find(
            (loc) => loc.id === e.target.value
          );
          if (newLocation) setLocation(newLocation);
        }}
      >
        {availableLocations.map((loc) => (
          <MenuItem key={loc.id} value={loc.id}>
            {loc.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
