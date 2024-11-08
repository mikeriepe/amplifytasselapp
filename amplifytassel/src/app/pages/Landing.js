import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ThemedButton from "../components/ThemedButton";
import LandingVideo from "../assets/landing_video.mp4";

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'

import "../stylesheets/Landing.css";

export default function Landing() {

  return (
    <div className="Landing">
      <video autoPlay muted loop class="landingVideo">
        <source src={LandingVideo} type="video/mp4"/>
      </video>
      <div className="elements">
          <h1 className="ACmmTitle" id="landingTitle">
            Tassel Volunteering
          </h1>
          <h2 className="secondaryTitle">
            Connect alumni with their alma mater
          </h2>
          <div class="centerButton">
            <Link to="/login">
              <ThemedButton
                aria-label="Login page button"
                startIcon={<PersonIcon />}
                color={"gray"}
                variant={"cancel"}
                style={{ marginTop: "10px", marginRight: "5px" }}
              >
                Login
              </ThemedButton>
            </Link>
            <Link to="/signup">
              <ThemedButton
                aria-label="Signup page button"
                color={"yellow"}
                variant={"gradient"}
                style={{ marginTop: "10px", marginLeft: "5px" }}
              >
                Join Now
              </ThemedButton>
            </Link>
          </div>
        </div>
    </div>
  );
}