import React, {useEffect} from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import ThemedButton from './ThemedButton';
import ExampleCover from '../assets/examplecover.png';

const Item = ({handleCardClick, profileid, children}, props) => (
  <MuiPaper
    onClick={() => handleCardClick(profileid)}
    elevation={0}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 'auto',
      background: 'white',
      boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
      borderRadius: '10px',
      textAlign: 'center',
      cursor: 'pointer',
    }}
    {...props}
  >
    {children}
  </MuiPaper>
);

const Banner = ({image}, props) => {
  return (
    <MuiBox
      {...props}
      sx={{
        height: '5em',
        width: '100%',
      }}
    >
      <img
        src={image}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          borderRadius: '10px 10px 0 0',
        }}
      />
    </MuiBox>
  );
};

const Avatar = ({image}, props) => (
  <MuiAvatar
    {...props}
    src={image}
    sx={{
      position: 'absolute',
      marginTop: '1.75em',
      height: '80px',
      width: '80px',
      border: '4px solid white',
      outline: '4px solid var(--primary-blue-main)',
    }}
  />
);

/**
 * @param {Object} profile
 * @param {Function} getProfileInfo
 * @param {Object} profileInfo
 * @return {JSX}
 */
export default function ViewOpportunityFindPeople({
  profile,
  getProfileInfo,
  profileInfo,
  handleCardClick,
}) {
  useEffect(() => {
    getProfileInfo(profile.userid);
  }, []);

  return (
    <Item handleCardClick={handleCardClick} profileid={profile.profileid}>
      {/* There is no profile banner implemented yet */}
      <Banner image={/* profileInfo.profilebanner */ExampleCover} />
      <Avatar image={profile.profilepicture} />
      <div style={{padding: '3.75em 1em 1em 1em'}}>
        <div style={{marginBottom: '1em'}}>
          <h4 className='text-bold text-dark'>
            {`${profile.firstname} ${profile.lastname}`}
          </h4>
          <p>{profile.major}</p>
        </div>
        <ThemedButton color='yellow' variant='round' size='small'>
          Send Invite
        </ThemedButton>
      </div>
    </Item>
  );
}
