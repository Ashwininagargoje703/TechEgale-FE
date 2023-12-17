import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Fade,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [userName, setUserName] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cookie = new Cookies();
  const token = cookie.get("serviceToken");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setCookie("serviceToken", "");
    setCookie("userId", "");
    setCookie("role", "");
    setCookie("userName", "");
    setCookie("name", "");
    setCookie("isLoggedIn", "false");
    setLogin(false);
    navigate("/login");
  };

  const drawerStyles = {
    width: 250,
  };

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          TechEgle
        </Typography>
        {token && (
          <>
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  <div
                    style={drawerStyles}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <List>
                      <ListItem button onClick={() => navigate("/home")}>
                        <ListItemText primary="Home" />
                      </ListItem>
                      <ListItem button onClick={() => navigate("/inventory")}>
                        <ListItemText primary="Inventory" />
                      </ListItem>
                      <ListItem button onClick={() => navigate("/cart")}>
                        <ListItemText primary="Cart" />
                      </ListItem>

                      <ListItem button onClick={() => navigate("/my-orders")}>
                        <ListItemText primary="My Order" />
                      </ListItem>

                      <ListItem button onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </div>
                </Drawer>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/home")}>
                  Home
                </Button>
                <Button color="inherit" onClick={() => navigate("/inventory")}>
                  Inventory
                </Button>
                <Button color="inherit" onClick={() => navigate("/cart")}>
                  Cart
                </Button>
                <Button color="inherit" onClick={() => navigate("/my-orders")}>
                  MyOrder
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout{" "}
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
