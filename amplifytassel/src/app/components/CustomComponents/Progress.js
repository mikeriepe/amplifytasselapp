import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MuiBox from '@mui/material/Box';

export default function Progress () {
  <MuiBox
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <CircularProgress />
  </MuiBox>
}