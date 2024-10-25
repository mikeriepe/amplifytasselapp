import React, { useEffect, useState } from "react";
import MuiBox from "@mui/material/Box";
import useAuth from "../util/AuthContext.js";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import DashboardOppThumbnail from "./DashboardOppThumbnail.js";

import { DataStore } from "@aws-amplify/datastore";
import { Opportunity } from "../../models/index.js";
import { useTabIndex } from "./TabIndexContext.js";

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
export default function DashboardNew({ data }) {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const { tabIndex, setTabIndex } = useTabIndex();
  const [allOpportunities, setAllOpportunities] = useState([]);

  const getAllOpportunities = () => {
    DataStore.query(Opportunity, (o) =>
      o.and((o) => [o.status.eq("APPROVED"), o.profileID.ne(userProfile.id)])
    )
      .then((res) => {
        var firstList = res;
        DataStore.query(Opportunity, (o) =>
          o.and((o) => [o.Requests.profileID.eq(userProfile.id)])
        ).then((res) => {
          const timeBoxedList = [];
          for (let i = 0; i < firstList.length; i++) {
            if (new Date(firstList[i].startTime) > Date.now()) {
              timeBoxedList.push(firstList[i]);
            }
          }
          setAllOpportunities(timeBoxedList);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving opportunities");
      });
  };

  useEffect(() => {
    getAllOpportunities();
  }, []);

  const numOpps = allOpportunities.length;
  const linkText = "View More";

  let displayOpps = [];
  if (numOpps > 3) {
    for (let i = 0; i < 3; i++) {
      displayOpps.push(allOpportunities[i]);
    }
  } else {
    displayOpps = allOpportunities;
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
                Browse Events
              </h2>
            </Text>
            <div className="flex-space-between flex-align-center">
              <Link
                className="text-bold text-blue ellipsis text-small
            hover-highlight-link"
                to="/opportunities"
                state={{ defaultTab: "browse" }}
                onClick={() => setTabIndex("/opportunities")}
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
                  No Current New Events
                </h2>
              </Text>
            </Box>
          )}
        </UpcomingSection>
      )}
    </>
  );
}
