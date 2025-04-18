import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileAbout from "../components/Profile/ProfileAbout";
import ProfileWork from "../components/Profile/ProfileWork";
import ProfileVolunteer from "../components/Profile/ProfileVolunteer";
import ProfileKeywords from "../components/Profile/ProfileKeywords";
import ProfileSocials from "../components/Profile/ProfileSocials";
import ProfileCollege from "../components/Profile/ProfileCollege";
import ProfileOrganization from "../components/Profile/ProfileOrganization";
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

 * creates Profile
 * @return {HTML} Profile component
 */
export default function ViewProfile() {
  const [profile, setProfile] = useState(null);
  const params = useParams();

  const getProfile = async () => {
    DataStore.query(Profile, params.profileid)
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving profile, please try again");
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Page>
      {profile && profile !== null && (
        <>
          <ProfileHeader data={profile} editButton={false} />
          <ProfileSocials data={profile} />
          <ProfileCollege data={profile} />
          <ProfileAbout data={profile} />
          <ProfileWork data={profile} />
          <ProfileVolunteer data={profile} />
          <ProfileOrganization data={profile} />
          <ProfileKeywords data={profile} />
        </>
      )}
    </Page>
  );
}
