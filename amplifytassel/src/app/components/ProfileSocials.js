import React from 'react';
import {styled} from '@mui/material';
import MuiPaper from '@mui/material/Paper';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';

const About = styled((props) => (
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

const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileSocials({data}) {
  return (
    <About>
      <h4 className='text-dark'>Socials</h4>
      <Grid container alignItems={'center'}>
        <Grid item xs={0.6}>
          <a href='https://www.linkedin.com/in/dawichan/' target='_blank'>
          <IconButton>
            <LinkedInIcon />
          </IconButton>
          </a>
        </Grid>
        <Grid item xs={11}>
          dawichan
        </Grid>
        <Grid item xs={0.6}>
          <Tooltip title='User email'>
          <IconButton>
            <EmailIcon />
          </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={11}>
          {data?.email}
          <Chip
            label='Verified'
            onClick={() => toast.success('Email verified', toastOptions)}
            icon={<CheckIcon />}
            color='success'
            size='small'
            style={{marginLeft: 8}}
            disableRipple
          />
        </Grid>
        <Grid item xs={0.6}>
          <Tooltip title='School email'>
            <IconButton>
              <EmailIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={11}>
          {data?.schoolEmail}
          <Chip
            label='Unverified'
            onClick={() => toast.error('Email unverified', toastOptions)}
            icon={<ClearIcon />}
            color='primary'
            size='small'
            style={{marginLeft: 8}}
            disableRipple
          />
        </Grid>
      </Grid>
    </About>
  );
}
