import { Link } from "react-router-dom";
import ThemedButton from "../components/Themed/ThemedButton";
import VolunteerImage from "../assets/Volunteer.jpeg";
import level from "../assets/level10-icon.png";
import sample1 from "../assets/sample1.PNG";
import sample2 from "../assets/sample2.jpg";
import React, { useRef, useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import "../stylesheets/Landing.css";

export default function Landing() {
  const targetContainerRef = useRef(null);
  const [showLearnMore, setShowLearnMore] = useState(true);

  // Function to handle scroll event
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowLearnMore(scrollTop === 0); // Show button only when scrolled to top
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll function for the button
  const handleScrollToContainer = () => {
    if (targetContainerRef.current) {
      targetContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="Landing"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      <div className="image-container">
        <h1 className="ACmmTitle text-italic" id="landingTitle">
          Bringing Alumni, Students,
          <br></br>
          and Staff Together
        </h1>
        <h2 className="secondaryTitle">
          Create opportunities, share events, and connect alumni,
          <br></br>
          students, and staff like never before.
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

      {/* "Learn More" Button - only visible when at the top */}
      {showLearnMore && (
        <Box position="fixed" bottom={0} width="100%" textAlign="center">
          <Button
            variant="contained"
            onClick={handleScrollToContainer}
            endIcon={<KeyboardDoubleArrowDownIcon />}
            sx={{
              color: "black",
              backgroundColor: "white",
              borderRadius: "50px",
              marginBottom: "1rem",
              "&:hover": {
                backgroundColor: "#f0f0f5",
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      )}

      <div className="info-section" ref={targetContainerRef}>
        <div className="text-content">
          <h4 className="section-header1">How it works</h4>
          <h3 className="section-header">Join Alumni Opportunities</h3>
          <p className="section-subtitle">
            Discover current opportunities where alumni volunteers are needed.
            Browse and apply to make an impact.
          </p>
        </div>
        <div className="image-content">
          <img src={sample1} alt="Caregiver with child" />
          <p className="image-description text-italic">
            View all posted opportunities and find one to get involved in. Send
            a request to join or leave a comment.
          </p>
        </div>
      </div>
      <div className="info-section">
        <div className="text-content">
          <h3 className="section-header">Post Opportunities for Alumni</h3>
          <p className="section-subtitle">
            Create and share opportunities to engage fellow alumni. Find the
            perfect volunteers for your initiative.
          </p>
        </div>
        <div className="image-content">
          <img src={sample2} alt="Caregiver with child" />
          <p className="image-description text-italic">
            Need alumni for an opportunity you're hosting? Post an opportunity
            and connect with alumni eager to get involved.{" "}
          </p>
        </div>
      </div>
      <div className="info-section">
        <div className="text-content">
          <h3 className="section-header">Earn Experience Points (XP)</h3>
          <p className="section-subtitle">
            Earn XP each time you volunteer and level up your profile. Unlock
            achievements as you give back.
          </p>
        </div>
        <div className="image-content">
          <img src={level} alt="Level" />
          <p className="image-description text-italic">
            Your level is displayed on your profile, reflecting your involvement
            with your alma mater. Higher levels unlock exclusive opportunities.
          </p>
        </div>
      </div>
      <div className="bottom-image-container">
        <img src={VolunteerImage} alt="Volunteer" className="bottom-image" />
      </div>
    </div>
  );
}
