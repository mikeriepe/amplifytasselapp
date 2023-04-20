import Box from '@mui/material/Box';
import React from 'react';
import MuiBox from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {toast} from 'react-toastify';

import ThemedButton from './ThemedButton';
import useAuth from '../util/AuthContext';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ButtonBase from '@mui/material/ButtonBase';
import MuiCard from '@mui/material/Card';

const Card = styled((props) => (
  <MuiCard elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '100%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const OutlinedIconButton = ({children}, props) => (
  <ButtonBase
    component='div'
    onMouseDown={(e) => {
      e.stopPropagation();
    }}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
    }}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
      width: '40px',
      padding: 0,
      background: 'transparent',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
      borderRadius: '5px',
    }}
    {...props}
  >
    {children}
  </ButtonBase>
);

/**
 * WorkExperienceDeleteModal
 * WorkExperienceDeleteModal
 * Displays form to collect data for new Work Experience
 * @param {Function} onClose
 * @return {HTML} WorkExperienceDeleteModal component
 */
export default function WorkExperienceDeleteModal({onClose}) {
  const {userProfile} = useAuth();

  const updateProfile = () => {
    fetch(`/api/updateProfile`, {
      method: 'POST',
      body: JSON.stringify({userid: userProfile.userid, ...userProfile}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        }); toast.success('Account updated', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  };

  const deleteWorkExperience = (index) => {
    const indexPosition = index + 1;
    const totalNumJobs = Object.keys(userProfile.experience).length;
    if (indexPosition === totalNumJobs) {
      const jobToDelete = 'job' + indexPosition;
      delete userProfile.experience[jobToDelete];
    } else {
      for (let i = indexPosition; i < totalNumJobs; i++) {
        const jobReplaced = 'job' + i;
        const jobReplacing = 'job' + (i+1);
        userProfile.experience[jobReplaced] =
        userProfile.experience[jobReplacing];
      }
      const duplicateLastJob = 'job' + totalNumJobs;
      delete userProfile.experience[duplicateLastJob];
    }
    updateProfile();
  };

  const jobTitleList = Object.keys(userProfile.experience).map((job, index)=>{
    return <Card className='clickable' key = {job}>
      <div
        className='flex-space-between flex-align-center'
        style={{padding: '5px', background: 'var(--background-primary)'}}
      >
        <MuiBox>
          <div>
            <h5>{userProfile.experience[job].title}</h5>
            <p className='text-bold text-blue'>
              {userProfile.experience[job].company}</p>
          </div>
        </MuiBox>
        <div className='flex-flow-large' style={{marginLeft: '50px'}}>
          {(
            <OutlinedIconButton>
              <CloseRoundedIcon
                sx={{
                  height: '20px',
                  width: '20px',
                  color: 'var(--error-red-main)',
                  stroke: 'var(--error-red-main)',
                  strokeWidth: '2px',
                }}
                onClick={() => {
                  deleteWorkExperience(index);
                  onClose();
                }}
              />
            </OutlinedIconButton>
          )}
        </div>
      </div>
    </Card>;
  });

  return (
    <Paper
      sx={{
        backgroundColor: 'rgb(240, 240, 240)',
        zIndex: '10',
        boxShadow: '-3px 5px 8px 0px rgba(84, 84, 84, 0.81)',
        borderRadius: '10px',
        padding: '1rem',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <MuiBox
        sx={{
          display: 'flex',
          color: 'darkgray',
          opacity: '50%',
          marginBottom: '10px',
          justifyContent: 'center',
          flex: 1, flexWrap: 'wrap',
        }}
      >
        Which job experience would you like to delete?
      </MuiBox>
      {jobTitleList}

      {/* Submit/Cancel Button wrapper */}
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'max-content',
          justifyContent: 'center',
          marginTop: '1em',
        }}
      >
        <div className='grid-flow-small'>
          <div className='flex-flow-large'>
            <ThemedButton
              onClick={() => {
                onClose();
              }}
              aria-label='Next step button'
              color={'yellow'}
              variant={'themed'}
              sx={{
                marginRight: '10px',
              }}
            >
              Cancel
            </ThemedButton>
          </div>
        </div>
      </Box>
    </Paper>
  );
}
