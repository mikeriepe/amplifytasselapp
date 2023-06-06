import React, {useEffect} from 'react';
import {styled} from '@mui/material';
import MuiPaper from '@mui/material/Paper';

const Work = styled((props) => (
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
export default function ProfileWork({data}) {
  // useEffect(() => {
  //   console.log('gothere2');
  //   console.log(data);
  // }, []);
  
  return (
    <Work>
      <h4 className='text-dark'>Work Experience</h4>
      <div className='flow-medium' aria-label='Profile Work Experience'>
        {data?.experience && data.experience.length >0 ? Object.keys(data?.experience).map((job, index) => (
          <div key={`work-experience-${index}`}>
            <h5>{data?.experience.title}</h5>
            <p className='text-bold text-blue'>{data?.experience[job].company}</p>
            <p>{data?.experience[job].location}</p>
            <p>{data?.experience[job].start + ' - ' +
            (data?.experience[job].end === '' ? 'Present' : data?.experience[job].end)}</p>
            <p style={{marginTop: '0.5em'}}>{data?.experience[job].description}</p>
          </div>
        )) : (
          <p>None</p>
        )}
      </div>
    </Work>
  );
}
