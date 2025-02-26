import * as React from 'react';
import {styled} from '@mui/material';
import MuiPaper from '@mui/material/Paper';

const Organization = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5em',
  padding: '2em',
  height: 'auto',
  width: '60%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileOrganization({data}) {
  return (
    <Organization>
      <h4 className='text-dark'>Organization/Club Activity</h4>
      <div className='flow-medium' aria-label='Profile Organization Experience'>
        {data?.organizationExperience && data.organizationExperience.length >0 ? Object.keys(data?.organizationExperience).map((org, index) => (
          <div key={`organization-experience-${index}`}>
            <h5>{data?.organizationExperience[org].role}</h5>
            <p className='text-bold text-blue'>{data?.organizationExperience[org].organization}</p>
            <p>{data?.organizationExperience[org].location}</p>
            <p>{data?.organizationExperience[org].start +
                ' - ' + (data?.organizationExperience[org].end === '' || data?.organizationExperience[org].currentPosition ?
                'Present' : data?.organizationExperience[org].end)}</p>
            <p style={{marginTop: '0.5em'}}>{data?.organizationExperience[org].description}</p>
          </div>
        )) : (
          <p>None</p>
        )}
      </div>
    </Organization>
  );
}
