import React from 'react';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import WorkExperienceCard from './WorkExperienceCard';
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
 * Creates list of work experience
 * @param {Object} workExperience
 * @return {JSX}
 */
export default function WorkExperienceList() {
  const {userProfile} = useAuth();

  return (
    <Page>
      <MuiBox className='flow-small' sx={{flexGrow: 1}}>
        {userProfile.experience ?
          Object.keys(userProfile.experience).map((job, index) => (
            <div
              className='flex-space-between flex-align-center'
              style={{
                background: 'var(--background-primary)'}}
              key={`work-experience-${index}`}
            >
              <WorkExperienceCard
                jobExperience={userProfile.experience[job]}
                jobIndex={job}/>
            </div>
          )) : (
          <p>None</p>
        )}
      </MuiBox>
    </Page>
  );
}
