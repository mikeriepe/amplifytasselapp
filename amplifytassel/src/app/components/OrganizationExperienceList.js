import React from 'react';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import OrganizationExperienceCard from './OrganizationExperienceCard';
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
 * @param {Object} organizationExperience
 * @return {JSX}
 */
export default function OrganizationExperienceList() {
  const {userProfile} = useAuth();

  return (
    <Page>
      <MuiBox className='flow-small' sx={{flexGrow: 1}}>
        {userProfile.organizationExperience ?
          userProfile.organizationExperience.map((organization, index) => (
            <div
              className='flex-space-between flex-align-center'
              style={{
                background: 'var(--background-primary)'}}
              key={`organization-experience-${index}`}
            >
              <OrganizationExperienceCard
                organizationExperience={organization}
                organizationIndex={index}/>
            </div>
          )) : (
          <p>None</p>
        )}
      </MuiBox>
    </Page>
  );
}
