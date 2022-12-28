import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { MenuOutlined } from "@mui/icons-material";
import { UIContext } from "../../context/ui";
import NextLink from "next/link";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={openSideMenu} size="small">
          <MenuOutlined />
        </IconButton>
        <NextLink href="/" passHref>
          <Link underline="hover">
            <Typography variant="h6"> Next Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
