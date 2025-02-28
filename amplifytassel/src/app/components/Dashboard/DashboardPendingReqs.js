import React, { useEffect, useState } from "react";
import MuiBox from "@mui/material/Box";
import useAuth from "../../util/AuthContext";

import { Typography, Box, List } from "@mui/material";
import DashboardCreate from "./DashboardCreate";
import DashboardPendingReqCard from "./DashboardPendingReqCard";
import { DataStore } from "@aws-amplify/datastore";
import { Opportunity } from "../../../models";

const PendingSection = ({ children }, props) => (
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
 * creates Dashboard Pending Requests section
 * @return {HTML} Dashboard Pending Requests component
 */
export default function DashboardPendingReqs({
  createdOpps,
  getCreatedOpportunities,
}) {
  const { userProfile } = useAuth();
  const [pendingOpps, setPendingOpps] = useState([]);

  const getPendingOpportunities = async () => {
    try {
      const res = await DataStore.query(Opportunity, (o) =>
        o.and((o) => [
          o.Requests.profileID.eq(userProfile.id),
          o.Requests.status.eq("PENDING"),
        ])
      );

      // Filter pending opportunities directly
      const pendingOpp = await Promise.all(
        res.map(async (opportunity) => {
          const values = await Promise.resolve(opportunity.Requests.values);
          return values.some(
            (value) =>
              value.profileID === userProfile.id && value.status === "PENDING"
          )
            ? opportunity
            : null;
        })
      );

      // Filter out null values (non-pending opportunities)
      setPendingOpps(pendingOpp.filter((opp) => opp !== null));
    } catch (err) {
      console.log(err);
      alert("Error retrieving pending opportunities");
    }
  };

  useEffect(() => {
    getPendingOpportunities();
  }, []);

  return (
    <PendingSection>
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
            Pending Requests
          </h2>
          <h5
            className="text-lightgray text-bold ellipsis"
            aria-label="Dashboard Header Count"
          >
            Pending requests for Opportunities you have applied for
          </h5>
        </Text>
        {/* <div
          className="flex-space-between flex-align-center"
          style={{ visibility: "hidden" }}
        >
          <DashboardCreate
            data={userProfile}
            getCreatedOpportunities={getCreatedOpportunities}
          />
        </div> */}
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
          {pendingOpps.length === 0 ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography className="text-lightgray">
                No Pending Requests
              </Typography>
            </Box>
          ) : (
            <List sx={{ maxHeight: "100%", overflow: "auto" }}>
              {pendingOpps
                .slice()
                .sort((a, b) => a.eventName.localeCompare(b.eventName))
                .map((opp, index) => {
                  return (
                    <DashboardPendingReqCard
                      key={`opportunity-${index}`}
                      opportunity={opp}
                    />
                  );
                })}
            </List>
          )}
        </Box>
      </Box>
    </PendingSection>
  );
}
