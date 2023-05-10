import Box from '@mui/material/Box';
import React from 'react';
import MuiBox from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import ThemedButton from './ThemedButton';
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

/**
 * PointsExplainationCard
 * Displays modal to explain how points system works
 * @param {Function} onClose
 * @return {HTML} PointsExplainationCard component
 */
export default function PointsExplainationCard({onClose}) {
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
          color: 'black',
          opacity: '50%',
          margin: '1em',
          justifyContent: 'center',
          flex: 1, flexWrap: 'wrap',
        }}
      >
        <div>
          The Tassel Alumni Micro-Volunteering platform provides an easy way for users to post volunteering opportunities, find qualified volunteers, and join opportunities. <br /><br />
          We strive to create a close knit, genuine community for all alumni who wish to connect with their alma mater. To do this, we’ve devised a participation system that rewards you for your active involvement on the platform. <br /><br />
          As you complete different tasks on Tassel, you will earn Tassel points. You can earn points by filling out your profile, creating new opportunities or joining existing ones! <br /><br />
           This is a great way to show your enthusiasm and engagement to your fellow alumni. Try it out now! <br /><br />
        </div>
      </MuiBox>


      {/* Cancel Button wrapper */}
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
              color={'blue'}
              variant={'themed'}
              sx={{
                marginRight: '1em',
              }}
            >
              Let's go!
            </ThemedButton>
          </div>
        </div>
      </Box>
    </Paper>
  );
}
