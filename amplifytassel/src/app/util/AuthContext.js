import React, {useContext, createContext, useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MuiBox from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';

import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Profile } from '../../models';

// initializes context
const AuthContext = createContext();

const Progress = () => (
  <MuiBox
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <CircularProgress />
  </MuiBox>
);

/**
 * component that provides authcontext
 * @param {*} props things passed in
 * @return {JSX} auth provider for auth context
 */
export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then((user) => {
        // console.log(JSON.stringify(user));
        console.log('got user');
        setUser(user.attributes);
        DataStore.query(Profile, c => c.email.eq(user.attributes.email))
          .then((profile) => {
            setUserProfile(profile[0]);
            setLoggedIn(true);
            setLoading(false);
          })
          .catch((err) => {
            setUser(null);
            setLoggedIn(false);
            setUserProfile(null);
            navigate('/');
            setLoading(false);
            console.log('error retreiving profile: ', err);
          });
      })
      .catch((err) => {
        setUser(null);
        setLoggedIn(false);
        setUserProfile(null);
        navigate('/');
        setLoading(false);
        console.log('user login verification failed: ', err);
      });
  }, []);

  return (
    <>
      {loading ? <Progress /> : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            loggedIn,
            setLoggedIn,
            userProfile,
            setUserProfile,
          }}
        >
          {props.children}
        </AuthContext.Provider>
      )}
    </>
  );
}

/**
 * allows other components to use auth
 * @return {context} user
 */
export default function useAuth() {
  return useContext(AuthContext);
}
