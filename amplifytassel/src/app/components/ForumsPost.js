import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ForumsComment from './ForumsComment';
import { Storage } from 'aws-amplify';


const Headline = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const PosterAvatar = ({image}, props) => (
  <MuiAvatar
    sx={{
      height: '40px',
      width: '40px',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
    }}
    src={image}
    {...props}
  />
);

/**
 * Post component
 * @param {Array} post
 * @param {Array} expanded
 * @param {Number} index
 * @param {Function} handleClick
 * @return {JSX}
 */
export default function ForumsPost({post, comments, getComments}) {
  const [expanded, setExpanded] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const downloadProfilePicture = async () => {
    if (post.picture !== null) {
      const file = await Storage.get(post.picture, {
        level: "public"
      });
      setProfilePicture(file);
    } else {
      setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const formatDate = (date) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const convertDate = new Date(date).toLocaleDateString([], dateOptions);
    const convertTime = new Date(date).toLocaleTimeString([], timeOptions);

    return `${convertDate} at ${convertTime}`;
  };

  useEffect(() => {
    getComments(post.id);
  }, []);

  useEffect(() => {
    downloadProfilePicture();
  }, [post]);

  return (
    <>
      <Headline>
        <PosterAvatar image={profilePicture} />
        <div>
          <div className='text-bold text-dark'>{post.title}</div>
          <p className='text-bold text-blue'>
            {`${post.firstName} ${post.lastName}`}
            <span className='text-normal text-gray'>
              {` · ${formatDate(post.createdTimestamp)}`}
            </span>
          </p>
        </div>
      </Headline>
      <p>{post.content}</p>
      {comments.hasOwnProperty(post.id) &&
        comments[post.id].length > 0 && (
        <div className='flex-end flex-align-center'>
          <p
            className='hover-underline'
            onClick={() => handleClick()}
            style={{'cursor': 'pointer', 'userSelect': 'none'}}
          >
            {expanded ? 'Hide Comments' : 'Show Comments'}
          </p>
          <ArrowDropUpRoundedIcon
            sx={{
              transform: expanded ? null : 'rotate(180deg)',
              transition: 'transform 300ms ease-out',
            }}
          />
        </div>
      )}
      {expanded && comments.hasOwnProperty(post.id) && (
        <>
          {comments[post.id].length > 0 && (
            <Divider
              sx={{borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)'}}
            />
          )}
          {comments[post.id].map((comment, index) =>
            (comment.content && (
              <ForumsComment
                key={`comment-${index}`}
                comment={comment}
                index={index}
              />
            )))}
        </>
      )}
    </>
  );
}
