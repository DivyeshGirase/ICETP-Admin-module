'use client'; // Add this line to mark the component as a client component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Get the current path
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark as client-side
  }, []);

  // Skip rendering the sidebar if the current page is the login page
  if (pathname === "/login") {
    return null; // Don't render Sidebar on the login page
  }

  if (!isClient) return null; // Wait for client-side hydration before rendering

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#163a24",
        color: "#fff",
        padding: "10px",
      }}
    >
      {/* Logo and Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
       
        <h3 style={{ margin: 0, color: "#ccc" }}>Admin Dashboard</h3>
      </div>

      {/* Sidebar Menu */}
      <List>
        <ListItem
          component={Link}
          href="/dashboard"
          passHref
          style={{
            backgroundColor: pathname === "/dashboard" ? "#2e7d32" : "transparent", // Highlight the active link
          }}
        >
          <ListItemIcon>
            <DashboardIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary={<span style={{ color: "#fff" }}>Dashboard</span>} />
        </ListItem>
        <ListItem component={Link} href="/projects" passHref>
          <ListItemIcon>
            <InventoryIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary={<span style={{ color: "#fff" }}>Projects</span>} />
        </ListItem>
        <ListItem component={Link} href="/orders" passHref>
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary={<span style={{ color: "#fff" }}>Orders</span>} />
        </ListItem>
        <ListItem component={Link} href="/categories" passHref>
          <ListItemIcon>
            <CategoryIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary={<span style={{ color: "#fff" }}>Categories</span>} />
        </ListItem>
        <ListItem component={Link} href="/users" passHref>
          <ListItemIcon>
            <PeopleIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary={<span style={{ color: "#fff" }}>Users</span>} />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
