import React, { useEffect, useState } from "react";
import MuiBox from "@mui/material/Box";
import useAuth from "../util/AuthContext";
import { Typography, Box, List } from "@mui/material";
import DashboardPendingOppCard from "./DashboardPendingOppCard";
import DashboardCreate from "../components/DashboardCreate";

import { DataStore } from "@aws-amplify/datastore";
import { Opportunity } from "./../../models";

const EventsSection = ({ children }, props) => (
  <MuiBox
    className="grid-flow-large"
    sx={{
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "center",
      marginTop: ".5em",
      height: "100%",
      width: "100%",
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
export default function DashboardYourEvents({
  createdOpps,
  getCreatedOpportunities,
}) {
  const { userProfile } = useAuth();

  useEffect(() => {
    getCreatedOpportunities();
  }, []);

  return (
    <EventsSection>
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
            Your Events
          </h2>
          <h5
            className="text-lightgray text-bold ellipsis"
            aria-label="Dashboard Header Count"
          >
            Events you have created
          </h5>
        </Text>
        <div className="flex-space-between flex-align-center">
          <DashboardCreate
            data={userProfile}
            getCreatedOpportunities={getCreatedOpportunities}
          />
        </div>
      </div>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Box
          sx={{
            height: 700,
            overflow: "hidden",
            borderRadius: 3,
            boxShadow: 3,
            overflow: "hidden",
            backgroundColor: "white",
            padding: 2,
          }}
        >
          {createdOpps.length === 0 ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography className="text-lightgray">
                No Events Created
              </Typography>
            </Box>
          ) : (
            <List sx={{ maxHeight: "100%", overflow: "auto" }}>
              {createdOpps
                .slice()
                .sort((a, b) => a.eventName.localeCompare(b.eventName))
                .map((opp, index) => {
                  return (
                    <DashboardPendingOppCard
                      key={`opportunity-${index}`}
                      opportunity={opp}
                    />
                  );
                })}
            </List>
          )}
        </Box>
      </Box>
    </EventsSection>
  );
}
