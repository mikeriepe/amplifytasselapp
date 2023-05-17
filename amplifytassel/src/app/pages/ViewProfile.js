import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material';
import MuiBox from '@mui/material/Box';
import ProfileHeader from '../components/ProfileHeader';
import ProfileAbout from '../components/ProfileAbout';
import ProfileWork from '../components/ProfileWork';
import ProfileVolunteer from '../components/ProfileVolunteer';
import ProfileKeywords from '../components/ProfileKeywords';
import { DataStore } from '@aws-amplify/datastore';
import { Profile } from '../../models';

const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1em',
  marginBlock: '1em',
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
      .catch((err)=>{
        console.log(err);
        alert('Error retrieving profile, please try again');
      })
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    
    <Page>
      {profile && profile !== null && (
        <>
          <ProfileHeader data={profile} editButton={false} />
          <ProfileAbout data={profile}/>
          <ProfileWork data={profile}/>
          <ProfileVolunteer data={profile}/>
          <ProfileKeywords data={profile} />
        </>
      )}
    </Page>
  );
}