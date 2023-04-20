import React from 'react';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import VolunteerExperienceCard from './VolunteerExperienceCard';
import useAuth from '../util/AuthContext';

const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  gap: '1em',
  height: 'auto',
  width: 'auto',
  marginBlock: '1em',
}));

/**
 * Creates list of volunteer experience
 * @param {Object} volunteerExperience
 * @return {JSX}
 */
export default function VolunteerExperienceList() {
  const {userProfile} = useAuth();

  return (
    <Page>
      <MuiBox className='flow-small' sx={{flexGrow: 1}}>
        {userProfile.volunteerExperience ?
          userProfile.volunteerExperience.map((job, index) => (
            <div
              className='flex-space-between flex-align-center'
              style={{
                background: 'var(--background-primary)'}}
              key={`volunteer-experience-${index}`}
            >
              <VolunteerExperienceCard
                jobExperience={job}
                jobIndex={index}/>
            </div>
          )) : (
          <p>None</p>
        )}
      </MuiBox>
    </Page>
  );
}
