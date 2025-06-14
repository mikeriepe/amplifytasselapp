import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiBox from "@mui/material/Box";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useTabIndex } from "../../context/TabIndexContext.js";

const Display = styled((props) => <MuiCard elevation={0} {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "auto",
  width: "100%",
  background: "#EB2F67",
  boxShadow: "0px 4px 50px -15px rgba(0, 86, 166, 0.15)",
  border: "0.5px solid rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
}));

const HeadingText = ({ children }, props) => (
  <MuiBox
    sx={{
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      height: "100%",
      lineHeight: 1.5,
      color: "white",
      fontWeight: "bold",
      fontSize: "1.2rem",
      margin: "1em",
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

/**
 * creates Dashboard header
 * @return {HTML} Dashboard header component
 */
export default function DashboardBrowse() {
  const { tabIndex, setTabIndex } = useTabIndex();
  const navigate = useNavigate();

  const handleNavigate = () => {
    setTabIndex("/opportunities/volunteers");
    navigate("/opportunities/volunteers");
  };
  return (
    <Display>
      <Button
        onClick={handleNavigate}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "auto",
          width: "100%",
          background: "#EB2F67",
          boxShadow: "0px 4px 50px -15px rgba(0, 86, 166, 0.15)",
          border: "0.5px solid rgba(0, 0, 0, 0.15)",
          borderRadius: "10px",
          ":hover": { bgcolor: "#bd2250", color: "white" },
        }}
      >
        <div aria-label="Dashboard Browse Button">
          <HeadingText>Look for new Opportunities</HeadingText>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "26px",
            marginBottom: "1em",
          }}
        >
          <SearchIcon
            sx={{
              fontSize: "7em",
              color: "white",
            }}
          />
        </Box>
      </Button>
    </Display>
  );
}
