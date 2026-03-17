import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../config";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoText, setLogoText] = useState("Portfolio");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get(`${API_URL}/profile`);
        if (res.data.logoText) setLogoText(res.data.logoText);
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };
    fetchLogo();
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setDrawerOpen(false);
  };

  return (
    <AppBar position="sticky" className="bg-white shadow-md text-gray-800">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="font-bold text-blue-600">
          {logoText}
        </Typography>

        {/* Desktop Menu */}
        <Box className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              color="inherit"
              onClick={() => scrollToSection(item.href)}
              className="text-gray-600 hover:text-black "
            >
              {item.name}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          className="md:hidden"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box className="w-64 p-4">
            <div className="flex justify-end">
              <IconButton onClick={() => setDrawerOpen(false)}>
                <Close />
              </IconButton>
            </div>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.name} className="px-0">
                  <Button
                    fullWidth
                    onClick={() => scrollToSection(item.href)}
                    className="justify-start text-gray-600 hover:text-blue-600"
                  >
                    {item.name}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
