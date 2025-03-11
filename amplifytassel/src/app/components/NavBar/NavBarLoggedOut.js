import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ThemedButton from "../Themed/ThemedButton";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import * as Nav from "./NavBarComponents";

const BrandStyling = {
  display: "flex",
  alignItems: "center",
  paddingLeft: "calc(20px - 8px + 6px - 2px)",
  width: "100%",
  cursor: "pointer",
};

/**
 * @return {JSX} NavBar Component
 */
export default function NavBarLoggedOut() {
  return (
    <>
      <Nav.AppBarLoggedOut
        position="fixed"
        sx={{
          boxShadow: "0",
          borderBottom: "0.5px solid #C0C4CB",
          width: "100%", // Ensure the navbar takes up the full width of the screen
        }}
      >
        <Toolbar
          className="navbar-height"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Aligned Image Box */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: {
                xs: "0rem",
                sm: "1rem",
                md: "2rem",
                lg: "4rem",
                xl: "8rem",
              },
            }}
          >
            <img
              src={require("../../assets/ucsc-logo.jpg")}
              alt="UCSC Logo"
              style={{ height: "50px", width: "auto" }}
            />
          </Box>

          {/* Left Spacer Box to Push Brand to Center */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Centered Brand Box */}
          <Link
            to="/"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SchoolIcon
                className="icon-yellow"
                sx={{ mr: 2, transform: "scale(1.5)" }}
              />
              <h1
                className="text-italic text-yellow"
                style={{ display: "block" }}
              >
                SlugMatch
              </h1>
            </Box>
          </Link>

          {/* Right Aligned Buttons */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              marginRight: { xs: "0", sm: "5%", md: "5%", lg: "5%", xl: "6%" },
            }}
          >
            <Link to="/login">
              <ThemedButton
                aria-label="Login page button"
                startIcon={<PersonIcon />}
                color={"gray"}
                variant={"cancel"}
              >
                Login
              </ThemedButton>
            </Link>
            <Link to="/signup">
              <ThemedButton
                aria-label="Signup page button"
                color={"yellow"}
                variant={"themed"}
                style={{ marginLeft: "1rem" }}
              >
                Join Now
              </ThemedButton>
            </Link>
          </Box>
        </Toolbar>
      </Nav.AppBarLoggedOut>
    </>
  );
}
