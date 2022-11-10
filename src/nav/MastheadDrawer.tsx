import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home, Help, GitHub } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function MastheadDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (arg0: boolean) => void;
}) {
  return (
    <div>
      <React.Fragment>
        <Drawer open={isDrawerOpen}>
          <MenuList setIsDrawerOpen={setIsDrawerOpen} />
        </Drawer>
      </React.Fragment>
    </div>
  );
}

const MenuList = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (arg0: boolean) => void;
}) => {
  const navigate = useNavigate();

  return (
    <Box role="presentation" onClick={() => setIsDrawerOpen(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/about")}>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              window.location.href = "https://github.com/elovejoy5/sbweather";
            }}
          >
            <ListItemIcon>
              <GitHub />
            </ListItemIcon>
            <ListItemText primary={"GitHub"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
