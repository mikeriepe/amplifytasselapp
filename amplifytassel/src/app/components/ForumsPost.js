import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ForumsComment from './ForumsComment';

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
    getComments(post.postid);
  }, []);

  return (
    <>
      <Headline>
        <PosterAvatar image={post.profilepicture} />
        <div>
          <div className='text-bold text-dark'>{post.title}</div>
          <p className='text-bold text-blue'>
            {`${post.firstname} ${post.lastname}`}
            <span className='text-normal text-gray'>
              {` · ${formatDate(post.createddate)}`}
            </span>
          </p>
        </div>
      </Headline>
      <p>{post.content}</p>
      {comments.hasOwnProperty(post.postid) &&
        comments[post.postid].length > 0 && (
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
      {expanded && comments.hasOwnProperty(post.postid) && (
        <>
          {comments[post.postid].length > 0 && (
            <Divider
              sx={{borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)'}}
            />
          )}
          {comments[post.postid].map((comment, index) =>
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
