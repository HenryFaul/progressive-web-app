import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router'
import InstallPWA from "../InstallPWA";
import Container from "@mui/material/Container";
import React from "react";

function MainNavigation() {
  const router = useRouter();
  return (


        <AppBar position="sticky">
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" onClick={()=>{ router.push("/");}} component="div" sx={{ flexGrow: 1 }}>
             HonestApp
            </Typography>
              <InstallPWA/>
              <Button color="inherit">Sign out</Button>
            <Button color="inherit">Sign in</Button>
          </Toolbar>
        </AppBar>
  );
}

export default MainNavigation;
