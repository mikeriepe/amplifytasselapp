import React from "react";
import { useRecommendations } from "../../context/RecommendationsContext";
import { Link } from "react-router-dom";
import { Grid, CircularProgress, Box } from "@mui/material";
import DashboardOppThumbnail from "./DashboardOppThumbnail";
import MuiBox from "@mui/material/Box";
import { useTabIndex } from "../../context/TabIndexContext";

const UpcomingSection = ({ children }, props) => (
  <MuiBox
    className="grid-flow-large"
    sx={{
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "3em",
      marginRight: "3em",
      marginTop: ".5em",
      height: "100%",
      width: "calc(100% - 6em)",
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const Text = ({ children }, props) => (
  <MuiBox
    sx={{
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

export default function DashboardRecommended() {
  const { recommendedOpps, loading } = useRecommendations(); // Access global recommendations
  const { tabIndex, setTabIndex } = useTabIndex();

  const linkText = "View More";

  return (
    <UpcomingSection className="grid-flow-large">
      <div
        className="flex-space-between flex-align-center"
        style={{
          background: "var(--background-primary)",
          marginBottom: "1rem",
        }}
      >
        <Text>
          <h2
            className="text-dark ellipsis text-medium"
            aria-label="Dashboard Upcoming Section"
          >
            Recommended Opportunities
          </h2>
          <h5
            className="text-lightgray text-bold ellipsis"
            aria-label="Dashboard Header Count"
          >
            Opportunities recommended for you
          </h5>
        </Text>
        <div className="flex-space-between flex-align-center">
          <Link
            className="text-bold text-blue ellipsis text-small hover-highlight-link"
            to="/opportunities"
            state={{ defaultTab: "browse" }}
            onClick={() => setTabIndex("/opportunities")}
          >
            {linkText}
          </Link>
        </div>
      </div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{ padding: "2rem" }}
        >
          <CircularProgress
            sx={{
              width: "80px !important", // Make the spinner larger
              height: "80px !important",
            }}
          />
        </Box>
      ) : (
        <div>
          {recommendedOpps.length > 0 ? (
            <Grid container spacing={{ sm: 1, md: 2 }} alignItems="stretch">
              {recommendedOpps.slice(0, 3).map((opportunity, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  key={index}
                  sx={{ display: "flex" }}
                >
                  <DashboardOppThumbnail
                    key={`opportunity-${index}`}
                    opportunity={opportunity}
                    sx={{ flexGrow: 1 }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ display: "flex" }} style={{ padding: "2rem" }}>
              <Text>
                <h2
                  className="text-light ellipsis text-medium"
                  aria-label="Dashboard Upcoming Section"
                >
                  No Current Recommended Opportunities
                </h2>
              </Text>
            </Box>
          )}
        </div>
      )}
    </UpcomingSection>
  );
}
