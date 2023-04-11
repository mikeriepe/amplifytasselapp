import * as React from 'react';
import {styled} from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import ExampleCover from '../assets/examplecover.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';

const Header = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  position: 'relative',
  width: 'calc(60% + 4em)',
  height: '500px',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Banner = ({image}, props) => (
  <MuiBox
    sx={{
      height: '65%',
      width: '100%',
      borderRadius: '10px',
    }}
    {...props}
  >
    <img
      src={image}
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover',
        height: '100%',
        width: '100%',
        borderRadius: '10px 10px 0 0',
      }}
    />
  </MuiBox>
);

const Content = ({children}, props) => (
  <MuiBox sx={{height: '35%'}} {...props}>
    {children}
  </MuiBox>
);

const Avatar = ({image, handleError}, props) => (
  <MuiBox
    sx={{
      height: '220px',
      width: '220px',
      position: 'absolute',
      left: '50px',
      top: '42%',
    }}
  >
    <MuiAvatar
      src={image}
      sx={{
        width: '100%',
        height: '100%',
        border: '6px solid white',
      }}
      alt='Remy Sharp'
      onError={handleError}
      {...props}
    />
  </MuiBox>
);

const Text = ({children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: '20em',
      height: '100%',
      width: 'calc(100% - 20em)',
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const ITEM_HEIGHT = 48;

const MoreIcon = ({anchorEl, open, handleClick, handleClose}) => (
  <MuiBox
    sx={{
      marginRight: '3em',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: '75%',
    }}
  >
    <IconButton
      aria-label='more'
      id='long-button'
      aria-controls={open ? 'long-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup='true'
      onClick={handleClick}
    >
      <MoreHorizIcon fontSize='large'/>
    </IconButton >
    <Menu
      id='long-menu'
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: '20ch',
        },
      }}
    >
      <Link to='/updateprofile'>
        <MenuItem onClick={handleClose}>Edit Personal Info</MenuItem>
      </Link>
    </Menu>
  </MuiBox>
);

/**
 * creates Profile header
 * @return {HTML} Profile header component
 */
export default function ProfileHeader({data}) {
  const handleError = (e) => {
    e.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Header>
      <Banner image={ExampleCover} />
      <Content>
        <Avatar image={data.profilepicture} handleError={handleError} />
        <Box
          sx={{display: 'flex', height: '100%'}}
        >
          <Text>
            <h2 className='text-dark ellipsis'>
              {data.firstname + ' ' + data.lastname}
            </h2>
            <h5 className='text-bold text-blue ellipsis'>
              Bachelors in {data.major}
            </h5>
            <p className='ellipsis'>Class of {data.graduationyear}</p>
            <p className='ellipsis'>{data.userlocation}</p>
          </Text>
          <MoreIcon anchorEl={anchorEl} open={open}
            handleClick={handleClick} handleClose={handleClose} />
        </Box>
      </Content>
    </Header>
  );
}
