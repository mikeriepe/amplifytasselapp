import React, { useEffect, useState } from "react";
import MuiBox from "@mui/material/Box";
import useAuth from "../util/AuthContext";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import DashboardOppThumbnail from "./DashboardOppThumbnail";

import { DataStore } from "@aws-amplify/datastore";
import { Opportunity } from "./../../models";
// import { useTabIndex } from "./TabIndexContext.js";

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

/**
 * creates Dashboard upcoming events section
 * @return {HTML} Dashboard upcoming events component
 */
export default function DashboardUpcoming({ data }) {
  const { userProfile } = useAuth();
  const [joinedOpportunities, setJoinedOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { tabIndex, setTabIndex } = useTabIndex();

  const getJoinedOpportunities = () => {
    const currTime = new Date().toISOString();
    DataStore.query(Opportunity, (o) =>
      o.and((o) => [
        o.profilesJoined.profile.id.eq(userProfile.id),
        o.endTime.gt(currTime),
      ])
    )
      .then((res) => {
        setJoinedOpportunities(res);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error retrieving joined opportunities");
        console.log(err);
      });
  };

  useEffect(() => {
    getJoinedOpportunities();
  }, []);

  const numOpps = joinedOpportunities.length;
  const linkText = "View More";

  let displayOpps = [];
  if (numOpps > 3) {
    for (let i = 0; i < 3; i++) {
      displayOpps.push(joinedOpportunities[i]);
    }
  } else {
    displayOpps = joinedOpportunities;
  }

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }} style={{ padding: "2rem" }}>
          <CircularProgress />
        </Box>
      ) : (
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
                Upcoming Opportunities
              </h2>
              <h5
                className="text-lightgray text-bold ellipsis"
                aria-label="Dashboard Header Count"
              >
                Your Opportunities that are coming up
              </h5>
            </Text>
            <div className="flex-space-between flex-align-center">
              <Link
                className="text-bold text-blue ellipsis text-small
            hover-highlight-link"
                to="/opportunities"
                state={{ defaultTab: "upcoming" }}
                // onClick={() => setTabIndex("/opportunities")}
              >
                {linkText}
              </Link>
            </div>
          </div>
          {numOpps > 0 ? (
            <Grid container spacing={{ sm: 1, md: 2 }} alignItems="stretch">
              {displayOpps.map((opportunity, index) => (
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
                  No Current Upcoming Opportunities
                </h2>
              </Text>
            </Box>
          )}
        </UpcomingSection>
      )}
    </>
  );
}
