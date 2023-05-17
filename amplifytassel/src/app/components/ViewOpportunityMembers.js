import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import MuiPaper from '@mui/material/Paper';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Profile, ProfileRole } from '../../models';
import { DataStore } from '@aws-amplify/datastore';
import { Storage } from 'aws-amplify';

const Paper = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Member = ({handleClick, profileid, children}, props) => (
  <MuiBox
    className='hover-highlight clickable'
    onClick={() => handleClick(profileid)}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '0.5em 2em 0.5em 2em',
      userSelect: 'none',
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

function Avatar ({image}, props) {
  const [profilePicture, setProfilePicture] = useState(null);

  const downloadProfilePicture = async () => {
    if (image !== null) {
      const file = await Storage.get(image, {
        level: "public"
      });
      setProfilePicture(file);
    } else {
      setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };
  useEffect(() => {
    downloadProfilePicture();
  }, [image]);

  return (
    <MuiAvatar sx={{height: '30px', width: '30px'}} src={profilePicture} {...props} />
  )
};

/**
 * Members section for view opportunity
 * @return {JSX}
 */
export default function ViewOpportunityMembers({
  isCreator,
  owner,
  members,
  roles,
}) {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  const handleClick = (profileid) => {
    console.log(owner.profileid);
    navigate(`/Profile/${profileid}`);
  };

  useEffect(() => async () => {
    let profilesWithRoles = [];
    // a for loop to get what profiles are in each role
    for (let i = 0; i < roles.length; i++) {
      // will return the profiles in roles[i]
      const profilesInRole = await DataStore.query(Profile, (p) => p.Roles.roleId.eq(roles[i].id));
      for (let j = 0; j < profilesInRole.length; j++) {
        let temp = {...profilesInRole[j]};
        temp.roleName = roles[i].name;
        profilesWithRoles.push(temp);
      }
    }
    setProfiles([...profilesWithRoles]);
  }, [members]);

  return (
    <Paper>
      <h4
        className='text-dark'
        style={{padding: '1.5em 2em calc(1.5em - 0.5em) 2em'}}
      >
        {isCreator ? 'Your Members' : 'Members'}
      </h4>
      <div style={{paddingBottom: 'calc(1.5em - 0.5em)'}} aria-label='View Opportunity Members'>
        <Member handleClick={handleClick} profileid={owner.profileid}>
          <Avatar image={owner.avatar} />
          <div>
            <div className='flex-align-center'>
              <p className='text-bold text-blue'>
                {owner.name}
              </p>
              <StarRoundedIcon
                sx={{
                  margin: '0 0 2px 5px',
                  fontSize: '1rem',
                  color: 'var(--secondary-yellow-main)',
                }}
              />
            </div>
            <p>Owner</p>
          </div>
        </Member>
        {profiles && profiles
            .sort((a, b) => {
              // a GP b NOT GP
              if (a.roleName !== 'General Participant' &&
                  b.roleName === 'General Participant') {
                return -1;
              } else if (b.roleName !== 'General Participant' &&
                  a.roleName === 'General Participant') {
                // b GP a NOT GP
                return 1;
              }
              // both not GP or both GP
              return a.firstName.localeCompare(b.firstName);
            })
            .map((profile, index) => (
              <Member
                key={`member-${index}`}
                handleClick={handleClick}
                profileid={profile.id}
              >
                <Avatar image={profile.picture} />
                <div>
                  <div className='flex-align-center'>
                    <p className='text-bold text-blue'>
                      {`${profile.firstName} ${profile.lastName}`}
                    </p>
                  </div>
                  <p>{profile.roleName}</p>
                </div>
              </Member>
            ))}
      </div>
    </Paper>
  );
};
