import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Help, Settings, WbSunny, Waves } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export const Footer = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const value = location.pathname;
  const showJsonLink =
    location.pathname.startsWith("/forecast") ||
    location.pathname.startsWith("/viewData");

  return (
    <div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigationAction
          value="/forecast"
          label="Home"
          icon={<Home />}
        />
        <BottomNavigationAction
          value="/viewData/astronomical"
          label="Astronomical"
          icon={<WbSunny />}
        />
        <BottomNavigationAction
          value="/viewData/tides"
          label="Tides"
          icon={<Waves />}
        />
        {showJsonLink && (
          <BottomNavigationAction
            value="/viewData/weather"
            label="Weather Data"
            icon={<Settings />}
          />
        )}
        <BottomNavigationAction value="/about" label="About" icon={<Help />} />
      </BottomNavigation>
    </div>
  );
};
