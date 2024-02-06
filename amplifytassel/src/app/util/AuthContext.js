import React, {useContext, createContext, useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Profile } from '../../models';

// initializes context
const AuthContext = createContext();

/**
 * component that provides authcontext
 * @param {*} props things passed in
 * @return {JSX} auth provider for auth context
 */
export function AuthProvider(props) {
  
  // What is user?
  const [user, setUser] = useState(null);

  // This should be removed.
  // The way to check if the user is logged in
  // is checking if user is null or not.
  const [loggedIn, setLoggedIn] = useState(false);

  // What is userProfile?
  const [userProfile, setUserProfile] = useState(null);

  // loadingAuth loads the user and userProfile,
  // or nullifies them if the user is logged out.
  const [loadingAuth, setLoadingAuth] = useState(true);

  const navigate = useNavigate();

  /**
   * This useEffect syncs the authentication status.
   * 
   * 1. isAuthLoading ensures this useEffect is only running once at any time.
   */
  const isAuthLoading = useRef(false);
  useEffect(() => {
    if (!loadingAuth) return;
    if (isAuthLoading.current) return;
    isAuthLoading.current = true;
    Auth.currentAuthenticatedUser()
      .then((authUser) => {
        DataStore.query(Profile, c => c.email.eq(authUser.attributes.email))
          .then((profile) => {
            if (
              userProfile &&
              JSON.stringify(userProfile) === JSON.stringify(profile[0]) &&
              user &&
              JSON.stringify(user) === JSON.stringify(authUser.attributes)
            ) {
              return;
            }
            setUser(authUser.attributes);
            setUserProfile(profile[0]);
            navigate('/dashboard');
          })
          .catch((err) => {
            if (!user && !userProfile) return;
            setUser(null);
            setUserProfile(null);
            navigate('/login');
            console.error('AuthContext: Error retreiving profile: ', err);
          });
      })
      .catch(() => {
        if (!user && !userProfile) return;
        setUser(null);
        setUserProfile(null);
        navigate('/login');
      })
      .finally(() => {
        isAuthLoading.current = false;
        setLoadingAuth(false);
      });
  }, [user, userProfile, loadingAuth, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, // This should be removed.
        loggedIn, // This should be removed.
        setLoggedIn, // This should be removed.
        userProfile,
        setUserProfile, // This should be removed.
        setLoadingAuth
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

/**
 * allows other components to use auth
 * @return {context} user
 */
export default function useAuth() {
  return useContext(AuthContext);
}
