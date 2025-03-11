import React from "react";
import { styled } from "@mui/material";
import MuiPaper from "@mui/material/Paper";
import LinkedInLogo from "../../assets/linkedinLogo.png";
import { Link } from "react-router-dom";
import { he } from "date-fns/locale";

const About = styled((props) => <MuiPaper elevation={0} {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.5em",
  padding: "2em",
  height: "auto",
  width: "60%",
  background: "white",
  boxShadow: "0px 4px 50px -15px rgba(0, 86, 166, 0.15)",
  border: "0.5px solid rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
}));

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileAbout({ data }) {
  return (
    <About>
      <h4 className="text-dark">Socials</h4>
      {data.linkedin ? (
        <div style={{ display: "flex" }}>
          <img
            style={{ height: "25px", marginRight: "10px" }}
            src={LinkedInLogo}
          alt="LinkedInLogo"></img>
          <Link target="_blank" to={data.linkedin}>
            {data.linkedin}
          </Link>
        </div>
      ) : (
        <p>None</p>
      )}
    </About>
  );
}
