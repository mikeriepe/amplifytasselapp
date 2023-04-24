import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MuiBox from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ThemedDropdown from './ThemedDropdown';
import ViewOpportunityPeopleCard from './ViewOpportunityPeopleCard';
import useAuth from '../util/AuthContext';

/**
 * Find people tab for view opportunity
 * @return {JSX}
 */
export default function ViewOpportunityFindPeople() {
  const navigate = useNavigate();
  const {userProfile} = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});

  const handleCardClick = (profileid) => {
    navigate(`/Profile/${profileid}`);
  };

  const getProfiles = () => {
    fetch(`/api/getActiveProfiles`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setProfiles(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving active profiles');
        });
  };

  const getProfileInfo = (profileid) => {
    fetch(`/api/getProfile/${profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setProfileInfo(json);
        })
        .catch((err) => {
          console.log(err);
          // alert('Error retrieving selected profile');
        });
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <MuiBox sx={{flexGrow: 1, marginTop: '1em'}}>
      <div
        className='flex-horizontal flex-space-between'
        style={{marginBottom: '1em'}}
      >
        <TextField
          placeholder='Search'
          size='small'
          InputProps={{
            style: {
              fontSize: '0.9rem',
              backgroundColor: 'white',
              borderRadius: '10px',
            },
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRoundedIcon color='tertiary' />
              </InputAdornment>
            ),
          }}
          sx={{
            'width': '400px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        />
        <ThemedDropdown menuItems={['Recommended', 'Alphabet', 'Major']} />
      </div>
      <Grid
        container
        spacing={2}
        columns={{xs: 4, sm: 8, md: 8, lg: 12, xl: 12}}
      >
        {profiles && profiles.filter((p) =>
          p.profileid !== userProfile?.profileid).map((profile, index) => (
          <Grid
            key={`profile-${index}`}
            item
            xs={2}
            sm={4}
            md={4}
            zeroMinWidth
          >
            <ViewOpportunityPeopleCard
              profile={profile}
              getProfileInfo={getProfileInfo}
              profileInfo={profileInfo}
              handleCardClick={handleCardClick}
            />
          </Grid>
        ))}
      </Grid>
    </MuiBox>
  );
}
