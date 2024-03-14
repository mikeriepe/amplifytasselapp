import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import MuiBox from "@mui/material/Box";
import useAuth from "../util/AuthContext";
import ProfileAlert from "../components/ProfileAlert";
import ProfileHeader from "../components/ProfileHeader";
import ProfileAbout from "../components/ProfileAbout";
import ProfileWork from "../components/ProfileWork";
import ProfileVolunteer from "../components/ProfileVolunteer";
import ProfileKeywords from "../components/ProfileKeywords";

import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Profile } from "../../models";

const Page = styled((props) => <MuiBox {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1em",
  marginBlock: "1em",
}));

/**
 * creates Proflie Page
 * @return {HTML} Profile component
 */
export default function MyProfile() {
  const { setLoadingAuth, userProfile } = useAuth();
  const [alertVisibility, setAlertVisibility] = useState(true);

  const handleDeactivateAccount = () => {
    console.log("deactivate acct api called here");
    DataStore.query(Profile, (p) => p.id.eq(userProfile.id))
      .then((res) => {
        DataStore.save(
          Profile.copyOf(res[0], (updated) => {
            updated.active = false;
          })
        );
      })
      .then(() => {
        Auth.signOut();
      })
      .then(() => {
        setLoadingAuth(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Page>
      {userProfile && (
        <>
          <ProfileAlert
            data={{
              profileEmail: userProfile.email,
              status: userProfile.status,
              infoRequest: userProfile.infoRequest,
              infoResponse: userProfile.infoResponse,
            }}
          />
          {alertVisibility ? (
            <Alert
              severity="info"
              onClose={() => {
                setAlertVisibility(false);
              }}
            >
              We may use your data to recommend you to volunteering
              opportunities.
            </Alert>
          ) : (
            <div></div>
          )}
          <ProfileHeader data={userProfile} editButton={true} />
          <ProfileAbout data={userProfile} />
          <ProfileWork data={userProfile} />
          <ProfileVolunteer data={userProfile} />
          <ProfileKeywords data={userProfile} />
          <Button
            onClick={handleDeactivateAccount}
            aria-label="Profile Deactivate Account"
          >
            Deactivate Account
          </Button>
        </>
      )}
    </Page>
  );
}
