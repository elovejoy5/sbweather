import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Help, Settings, WbSunny } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export const Footer = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const value = location.pathname;
  const showJsonLink = location.pathname.startsWith("/forecast");

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
          label="Astronomical Data"
          icon={<WbSunny />}
        />
        <BottomNavigationAction value="/about" label="About" icon={<Help />} />
        {showJsonLink && (
          <BottomNavigationAction
            value="/viewData/weather"
            label="Weather Data"
            icon={<Settings />}
          />
        )}
      </BottomNavigation>
    </div>
  );
};
