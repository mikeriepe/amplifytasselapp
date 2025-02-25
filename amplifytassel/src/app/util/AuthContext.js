import React, {useContext, createContext, useState, useEffect, useRef} from 'react';
import Progress from '../components/CustomComponents/Progress';

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
        // console.log('email: ' + authUser.attributes.email);
        DataStore.query(Profile, c => c.email.eq(authUser.attributes.email))
          .then((profile) => {
            // console.log('profile: ' + JSON.stringify(profile));
            setLoadingAuth(false);
            isAuthLoading.current = false;
            if (
              userProfile &&
              JSON.stringify(userProfile) === JSON.stringify(profile[0]) &&
              user &&
              JSON.stringify(user) === JSON.stringify(authUser.attributes)
            ) {
              return;
            }
            setUser(authUser.attributes);
            try {
              setUserProfile(profile[profile.length - 1]);
            }
            catch (error) {
              console.log('Unable to find profile: ' + error.message);
              setUserProfile({});
            }
            console.log('Logged in, set user and userProfile');
          })
          .catch((err) => {
            setLoadingAuth(false);
            isAuthLoading.current = false;
            if (!user && !userProfile) return;
            setUser(null);
            setUserProfile(null);
            console.error('AuthContext: Error retreiving profile: ', err);
          });
      })
      .catch(() => {
        setLoadingAuth(false);
        isAuthLoading.current = false;
        if (!user && !userProfile) return;
        setUser(null);
        setUserProfile(null);
      })
  }, [user, userProfile, loadingAuth]);

  return (
    <>
      {(loadingAuth || isAuthLoading.current) ? <Progress /> : (
        <AuthContext.Provider
          value={{
            user,
            setUser, // This should be removed.
            loggedIn, // This should be removed.
            setLoggedIn, // This should be removed.
            userProfile,
            setUserProfile, // This should be removed.
            loadingAuth,
            setLoadingAuth
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
