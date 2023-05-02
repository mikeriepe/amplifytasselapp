import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import ProfileBanner from './ProfileBanner.js'
import useAuth from '../util/AuthContext.js';


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

const Content = ({ children }, props) => (
  <MuiBox sx={{ height: '35%' }} {...props}>
    {children}
  </MuiBox>
);

const Avatar = ({ image, handleError }, props) => (
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

const Text = ({ children }, props) => (
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

const MoreIcon = ({ anchorEl, open, handleClick, handleClose, hiddenFileInput }) => (
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
      <MoreHorizIcon fontSize='large' />
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
        <MenuItem onClick={() => {
          handleClose();
          hiddenFileInput.current.click();
        }}>Edit Profile Banner
        </MenuItem>
    </Menu>
  </MuiBox>
);

/**
 * creates Profile header
 * @return {HTML} Profile header component
 */
export default function ProfileHeader({ data }) {
  const [majors, setMajors] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const hiddenFileInput = React.useRef(null);
  const { userProfile } = useAuth();

  const extractMajors = async () => {
    try {
      const value = await Promise.resolve(data.Majors.values);
      const majorNames = [];
      for (let i = 0; i < value.length; i++) {
        const k = await Promise.resolve(value[i].major);
        majorNames.push(k.name);
      }
      setMajors(majorNames);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    extractMajors();
  }, []);

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

  const updateSelectedFile = (file) => {
    setSelectedFile(file);
  };

  return (
    <Header>
      <ProfileBanner selectedFile={selectedFile} data={data}/>
      <Content>
        <Avatar image={data?.picture} handleError={handleError} />
        <Box
          sx={{ display: 'flex', height: '100%' }}
        >
          <Text>
            <h2 className='text-dark ellipsis'>
              {data.firstName + ' ' + data.lastName}
            </h2>
            <h5 className='text-bold text-blue ellipsis'>
              {majors?.length >0 && majors.map((major,index) => (
                <p key={index}>{majors[index]}</p>
              ))}
            </h5>
            <p className='ellipsis'>Class of {data.graduationYear}</p>
            <p className='ellipsis'>{data.location}</p>
          </Text>
          { (data && data.id === userProfile.id) && (
            <>
              <MoreIcon anchorEl={anchorEl} open={open}
              handleClick={handleClick} handleClose={handleClose} updateSelectedFile={updateSelectedFile} hiddenFileInput={hiddenFileInput}/>
              <input type="file" accept="image/x-png,image/jpeg" ref={hiddenFileInput} multiple={false} onChange={(e) => updateSelectedFile(e.target.files[0])} hidden/>
            </>
          )}
        </Box>
      </Content>
    </Header>
  );
}
