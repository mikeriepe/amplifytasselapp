import React from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ThemedButton from './ThemedButton';
import PersonIcon from '@mui/icons-material/Person';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import * as Nav from './NavBarComponents';

const BrandStyling = {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 'calc(20px - 8px + 6px - 2px)',
  width: '100%',
  cursor: 'pointer',
};

/**
 * @return {JSX} NavBar Component
 */
export default function NavBarLoggedOut() {
  return (
    <>
      <Nav.AppBarLoggedOut
        position='fixed'
        sx={{
          boxShadow: '0',
          borderBottom: '0.5px solid #C0C4CB',
        }}
      >
        <Toolbar className='navbar-height'>
          <Link to='/'>
            <Box sx={BrandStyling}>
              <StarRoundedIcon
                className='icon-yellow'
                sx={{mr: 2, transform: 'scale(1.5)'}}
              />
              <h3
                className='text-italic text-yellow'
                style={{display: 'block'}}
              >
                Tassel
              </h3>
            </Box>
          </Link>
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            <Link to='/login'>
              <ThemedButton
                aria-label='Login page button'
                startIcon={<PersonIcon />}
                color={'gray'}
                variant={'cancel'}
              >
                Login
              </ThemedButton>
            </Link>
            <Link to='/signup'>
              <ThemedButton
                aria-label='Signup page button'
                color={'yellow'}
                variant={'gradient'}
                style={{marginLeft: '1rem'}}
              >
                Join Now
              </ThemedButton>
            </Link>
          </Box>
        </Toolbar>
      </Nav.AppBarLoggedOut>
    </>
  );
}
