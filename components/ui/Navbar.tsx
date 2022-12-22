import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { MenuOutlined } from "@mui/icons-material";
import { UIContext } from "../../context/ui";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={openSideMenu} size="small">
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6"> Next Jira</Typography>
      </Toolbar>
    </AppBar>
  );
};
