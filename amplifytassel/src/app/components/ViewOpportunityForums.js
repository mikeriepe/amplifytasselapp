import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import MuiBox from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import MuiPaper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ForumsNewPost from './ForumsNewPost';
import ForumsPost from './ForumsPost';
import useAuth from '../util/AuthContext';

const Paper = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '1.5em 2em 1.5em 2em',
  marginTop: '1em',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Loading = (props) => (
  <MuiBox
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '25%',
    }}
  >
    <CircularProgress {...props} />
  </MuiBox>
);

const Input = ({
  postNewComment,
  name,
  image,
  postid,
}, props) => {
  const {userProfile} = useAuth();
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e, postid) => {
    if (content.length === 0) {
      return alert('Comment cannot be empty');
    }

    const data = {
      'postid': postid,
      'userid': userProfile?.userid,
      'content': content,
    };

    postNewComment(data, postid);
    setContent('');
  };

  return (
    <MuiBox
      component='form'
      sx={{
        display: 'flex',
        gap: '10px',
      }}
    >
      <MuiAvatar
        src={image}
        sx={{
          marginBlock: '4px',
          height: '30px',
          width: '30px',
        }}
      />
      <TextField
        name={name}
        value={content}
        onChange={(e) => handleChange(e)}
        placeholder='Write a comment...'
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
      <IconButton
        onClick={(e) => handleSubmit(e, postid)}
        color='primary'
        sx={{
          display: 'flex',
          height: '38px',
          width: '38px',
          padding: 0,
        }}
      >
        <SendRoundedIcon />
      </IconButton>
    </MuiBox>
  );
};

/**
 * Forums tab for view opportunity
 * @return {JSX}
 */
export default function ViewOpportunityForums({id}) {
  const {userProfile} = useAuth();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const sortByDate = (array) => {
    return array.sort((a, b) =>
      new Date(b.createddate).getTime() - new Date(a.createddate).getTime(),
    );
  };

  const getPosts = () => {
    setIsLoading(true);
    fetch(`/api/getPosts/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setPosts(json);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity posts');
        });
  };

  const getComments = (postid) => {
    fetch(`/api/getComments/${postid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setComments((prevComments) => ({
            ...prevComments,
            [postid]: json,
          }));
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity comments');
        });
  };

  const postNewPost = (data) => {
    fetch(`/api/postPost`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setPosts((prevPosts) => [...prevPosts, json]);
        })
        .catch((err) => {
          console.log(err);
          alert('Error posting opportunity post');
        });
  };

  const postNewComment = (data, postid) => {
    fetch(`/api/postComment`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setComments((prevComments) => {
            if (prevComments.hasOwnProperty(postid)) {
              return ({
                ...prevComments,
                [postid]: [...prevComments[postid], json],
              });
            } else {
              return ({
                ...prevComments,
                [postid]: [json],
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
          alert('Error posting opportunity comment');
        });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <ForumsNewPost postNewPost={postNewPost} />
      {isLoading ? <Loading /> : null}
      {posts ? (
        sortByDate(posts).map((post, index) => (
          <Paper key={`post-${index}`}>
            <ForumsPost
              post={post}
              comments={comments}
              getComments={getComments}
            />
            <Input
              postNewComment={postNewComment}
              name='content'
              image={userProfile?.profilepicture}
              postid={post.postid}
            />
          </Paper>
        ))
      ) : (
        <p>There are no posts</p>
      )}
    </>
  );
};
