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
import { DataStore } from '@aws-amplify/datastore';
import { Post, Comment, Profile } from '../../models';
import { Storage } from 'aws-amplify';


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
      'userid': userProfile?.id,
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

  const sortByDate = (array) => {
    return array.sort((a, b) =>
      new Date(b.createddate).getTime() - new Date(a.createddate).getTime(),
    );
  };

  const getPosts = async () => {
    setIsLoading(true);
    let tempPosts = await DataStore.query(Post, (p) => p.and(p => [p.opportunityID.eq(id)]));
    // need to join posts with their creators
    const postsWithProfiles = [];
    for (let i = 0; i < tempPosts.length; i++){
      const profile = await DataStore.query(Profile, (p) => p.id.eq(tempPosts[i].profileID));
      postsWithProfiles.push({...profile[0], ...tempPosts[i]});
    }
    setPosts([...postsWithProfiles]);
    // console.log(tempPosts)
    setIsLoading(false);
  };

  const getComments = async (postid) => {
    let tempComments = await DataStore.query(Comment, (p) => p.and(p => [p.postID.eq(postid)]));
    console.log(tempComments);
    // need to join comments with their creators
    const commentsWithProfiles = [];
    for (let i = 0; i < tempComments.length; i++){
      const profile = await DataStore.query(Profile, (p) => p.id.eq(tempComments[i].profileID));
      commentsWithProfiles.push({...profile[0], ...tempComments[i]});
    }
    setComments((prevComments) => ({
      ...prevComments,
      [postid]: commentsWithProfiles,
    }));
  };

  const postNewPost = async (data) => {
    // post the post here
    const post = await DataStore.save(
      new Post({
        title: data.title,
        content: data.content,
        createdTimestamp: data.createddate,
        profileID: data.userid,
        opportunityID: data.opportunityid,
      })
    );
    // join the profile with the post
    setPosts((prevPosts) => [...prevPosts, {...userProfile, ...post}]);
  };

  const postNewComment = async (data, postid) => {
    let comment = await DataStore.save(
      new Comment({
        content: data.content,
        createdTimestamp: new Date().getTime(),
        profileID: data.userid,
        postID: data.postid,
      })
    );

    // join the profile with the comment
    comment = {...userProfile, ...comment}
    setComments((prevComments) => {
      if (prevComments.hasOwnProperty(postid)) {
        return ({
          ...prevComments,
          [postid]: [...prevComments[postid], comment],
        });
      } else {
        return ({
          ...prevComments,
          [postid]: [comment],
        });
      }
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    downloadProfilePicture();
  }, [userProfile]);

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
              image={profilePicture}
              postid={post.id}
            />
          </Paper>
        ))
      ) : (
        <p>There are no posts</p>
      )}
    </>
  );
};
