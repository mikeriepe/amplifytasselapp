import React from 'react';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';

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
  return (
    <Comment key={`comment-${index}`}>
      <CommenterAvatar
        image={comment.profilepicture}
      />
      <Bubble>
        <p className='text-bold text-dark'>
          {`${comment.firstname} ${comment.lastname}`}
        </p>
        <p>{comment.content}</p>
      </Bubble>
    </Comment>
  );
}
