import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import { Storage } from 'aws-amplify';

const Comment = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  gap: '10px',
}));

const Bubble = styled((props) => (
  <MuiBox {...props} />
))(({theme}) => ({
  padding: '0.75em',
  borderRadius: '10px',
  background: theme.palette.tertiary.bright,
}));

const CommenterAvatar = ({image}, props) => (
  <MuiAvatar sx={{height: '30px', width: '30px'}} src={image} {...props} />
);

/**
 * Comment component
 * @param {Object} comment
 * @param {Number} index
 * @return {JSX}
 */
export default function ForumsComment({comment, index}) {
  const [profilePicture, setProfilePicture] = useState(null);

  const downloadProfilePicture = async () => {
    if (comment.picture !== null) {
      const file = await Storage.get(comment.picture, {
        level: "public"
      });
      setProfilePicture(file);
    } else {
      setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };

  useEffect(() => {
    downloadProfilePicture();
  }, [comment]);

  return (
    <Comment key={`comment-${index}`}>
      <CommenterAvatar
        image={profilePicture}
      />
      <Bubble>
        <p className='text-bold text-dark'>
          {`${comment.firstName} ${comment.lastName}`}
        </p>
        <p>{comment.content}</p>
      </Bubble>
    </Comment>
  );
}
