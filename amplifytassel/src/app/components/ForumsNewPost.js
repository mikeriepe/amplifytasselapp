import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ThemedButton from './ThemedButton';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import useAuth from '../util/AuthContext';
import { Storage } from 'aws-amplify';

const Paper = styled((props) => (
  <MuiPaper elevation={0} component='form' {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '1.5em 2em 1.5em 2em',
  marginTop: '1em',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Input = ({
  name,
  value,
  handleChange,
  image,
  placeholder,
  minRows,
}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
    }}
  >
    {image && (
      <MuiAvatar
        src={image}
        sx={{
          height: '40px',
          width: '40px',
          border: '0.5px solid rgba(0, 0, 0, 0.15)',
        }}
      />
    )}
    <TextField
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
      placeholder={placeholder}
      minRows={minRows}
      size='small'
      InputProps={{
        style: {
          fontSize: '0.9rem',
          borderRadius: '10px',
        },
      }}
      multiline
      fullWidth
      {...props}
    />
  </MuiBox>
);

/**
 * New post component
 * @return {JSX}
 */
export default function ForumsNewPost({postNewPost}) {
  const params = useParams();
  const {userProfile} = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const downloadProfilePicture = async () => {
    if (userProfile.picture !== null) {
      const file = await Storage.get(userProfile.picture, {
        level: "public"
      });
      setProfilePicture(file);
    } else {
      setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };

  useEffect(() => {
    downloadProfilePicture();
  }, [userProfile]);


  const handleSubmit = (e) => {
    if (title.length === 0 || content.length === 0) {
      return alert('Please fill in all fields');
    }

    const data = {
      'opportunityid': params.opportunityid,
      'userid': userProfile.id,
      'content': content,
      'title': title,
      'createddate': new Date().getTime(),
    };

    postNewPost(data);
    setTitle('');
    setContent('');
  };

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else {
      setContent(e.target.value);
    }
  };

  return (
    <Paper>
      <Input
        name='title'
        value={title}
        handleChange={(e) => handleChange(e)}
        image={profilePicture}
        placeholder={'Title'}
      />
      <Input
        name='content'
        value={content}
        handleChange={(e) => handleChange(e)}
        placeholder={'Write a new post...'}
        minRows={3}
      />
      <div className='flex-end'>
        <MuiBox sx={{width: 'auto'}}>
          <ThemedButton
            color='yellow'
            variant='themed'
            endIcon={<SendRoundedIcon />}
            onClick={(e) => handleSubmit(e)}
          >
            Send
          </ThemedButton>
        </MuiBox>
      </div>
    </Paper>
  );
}
