import React from "react";
import { Link } from "react-router-dom";
import ThemedButton from "../components/ThemedButton";
import VolunteerImage from "../assets/Volunteer.jpeg";
import level from "../assets/level10-icon.png";
import sample1 from "../assets/sample1.PNG";
import sample2 from "../assets/sample2.jpg";

import "../stylesheets/Landing.css";

export default function Landing() {
  return (
    <div
      className="Landing"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      <div className="image-container">
        <h1 className="ACmmTitle text-italic" id="landingTitle">
          Connecting alumni with
          <br></br>
          their alma mater
        </h1>
        <h2 className="secondaryTitle">
          Find or host volunteering opportunities to
          <br></br>
          get alumni involved
        </h2>
        <Link to="/signup">
          <ThemedButton
            aria-label="Signup page button"
            color={"yellow"}
            variant={"round"}
            style={{ marginTop: "10px", marginLeft: "5px" }}
          >
            Get Started
          </ThemedButton>
        </Link>
      </div>
      <div className="info-section">
        <div className="text-content">
          <h4 className="section-header1">How it works</h4>
          <h3 className="section-header">
            Join opportunities that <br></br> need alumni volunteers
          </h3>
          <p className="section-subtitle">
            View all the current opportunities that <br></br> need volunteers
            and apply to join.
          </p>
        </div>
        <div className="image-content">
          <img src={sample1} alt="Caregiver with child" />
          <p className="image-description">
            View all posted opportunities and find one to get involved in. Send
            a rquest to joing or leave a comment.
          </p>
        </div>
      </div>
      <div className="info-section">
        <div className="text-content">
          <h3 className="section-header">
            Post an opportunity that <br></br>needs volunteers
          </h3>
          <p className="section-subtitle">
            Post your opportunity for other<br></br> alumni to see and apply to.
          </p>
        </div>
        <div className="image-content">
          <img src={sample2} alt="Caregiver with child" />
          <p className="image-description">
            Need alumni for an opportunity you're hosting? Post an opportunity
            and find alumni that want to get involved.
          </p>
        </div>
      </div>
      <div className="info-section">
        <div className="text-content">
          <h3 className="section-header">Earn XP</h3>
          <p className="section-subtitle">
            When you volunteer, you earn xp points <br></br>and unlock new
            levels to your account.
          </p>
        </div>
        <div className="image-content">
          <img src={level} alt="Level" />
          <p className="image-description">
            Your level shows on your account and shows how involved you are with
            your alma mater. Only certain levels can take part in certain
            opportunities.
          </p>
        </div>
      </div>
      <div className="bottom-image-container">
        <img src={VolunteerImage} alt="Volunteer" className="bottom-image" />
      </div>
    </div>
  );
}
