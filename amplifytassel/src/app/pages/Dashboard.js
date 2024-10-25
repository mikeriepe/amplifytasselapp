import React, { useState } from "react";
import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import { Grid } from "@mui/material";
import useAuth from "../util/AuthContext";
import DashboardHeader from "../components/DashboardHeader";
import DashboardUpcoming from "../components/DashboardUpcoming";
import DashboardNew from "../components/DashboardNew";
import DashboardBrowse from "../components/DashboardBrowse";
import DashboardCreate from "../components/DashboardCreate";
import DashboardPendingReqs from "../components/DashboardPendingReqs";
import DashboardYourEvents from "../components/DashboardYourEvents";

import { DataStore } from "@aws-amplify/datastore";
import { Opportunity } from "./../../models";

const Page = styled((props) => <MuiBox {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1em",
  marginBlock: "1em",
  marginLeft: "2em",
  marginRight: "2em",
}));

/**
 * creates dashboard page
 * @return {HTML} dashboard page
 */
export default function Dashboard() {
  const { userProfile } = useAuth();
  const [createdOpps, setCreatedOpps] = useState([]);

  const getCreatedOpportunities = () => {
    DataStore.query(Opportunity, (c) => c.profileID.contains(userProfile.id))
      .then((res) => {
        setCreatedOpps(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving created opportunities");
      });
  };

  return (
    <Page>
      {userProfile && (
        <>
          <DashboardHeader data={userProfile} />
          <DashboardUpcoming data={userProfile} />
          <DashboardNew data={userProfile} />
          <Grid
            container
            sx={{
              marginLeft: "calc(3em - 16px)",
              marginTop: "1em",
              marginRight: "3em",
              height: "100%",
              width: "calc(100% - 6em)",
              lineHeight: 1.5,
            }}
            spacing={2}
            justifyContent="space-between"
          >
            <Grid
              item
              xs={12}
              md={5.9}
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <DashboardYourEvents
                createdOpps={createdOpps}
                getCreatedOpportunities={getCreatedOpportunities}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={5.9}
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <DashboardPendingReqs
                createdOpps={createdOpps}
                getCreatedOpportunities={getCreatedOpportunities}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Page>
  );
}
