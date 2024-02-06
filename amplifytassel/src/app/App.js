/* src/App.js */
import React, { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Box from '@mui/material/Box';
import Landing from './pages/Landing';
import NavBarLoggedOut from './components/NavBarLoggedOut';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Approvals from './pages/Approvals';
import UpdateProfile from './pages/UpdateProfile';
import NavBarLoggedIn from './components/NavBarLoggedIn';
import Settings from './pages/Settings';
import Socials from './pages/Social';
import ViewMessages from './pages/ViewMessages';
import './stylesheets/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ViewOpportunity from './pages/ViewOpportunity';
import Opportunities from './pages/Opportunities';
import MyProfile from './pages/MyProfile';
import ViewProfile from './pages/ViewProfile';
import AnimationStarFlying from './components/AnimationStarFlying';
import AnimationConfetti from './components/AnimationConfetti';
import { Auth } from 'aws-amplify';


import useAuth from './util/AuthContext';
import { Amplify} from 'aws-amplify'
import awsExports from "../aws-exports";
import useAnimation from './util/AnimationContext';
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {
  const { user } = useAuth();
  const {
    showStarAnimation,
    showConfettiAnimation,
    setShowConfettiAnimation,
    setShowStarAnimation
  } = useAnimation();

  const signOut = async () => {
    try {
      await Auth.signOut();
      // Optionally, you can redirect the user to a logout page or the homepage.
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Get the 'keepLoggedIn' state from localStorage
      const keepLoggedIn = localStorage.getItem('keepLoggedIn') === 'true';

      if (!keepLoggedIn) {
        // If 'keepLoggedIn' is not true, prompt the user and sign out
        event.returnValue = 'You are about to log out. Are you sure?';
        signOut();
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []);
  
  return (
    <Box sx={{display: 'flex'}}>
      <ToastContainer />
      {user ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
      <Box component='main' sx={{flexGrow: 1, marginTop: '70px'}}>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/settings' element={<Settings />}/>
          <Route
            path='/opportunity/:opportunityid'
            element={<ViewOpportunity />}
          />
          <Route path='/profile/:profileid' element={<ViewProfile />} />
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/approvals' element={<Approvals/>}/>
          <Route path='/opportunities' element={<Opportunities />}/>
          <Route path='/myprofile' element={<MyProfile />}/>
          <Route path='/landing' element={<Landing />}/>
          <Route path='/updateprofile' element={<UpdateProfile />} />
          <Route path='/social' element={<Socials/>} />
          <Route path='/social/:chatroomid' element={<ViewMessages/>}/>
        </Routes>
      </Box>
      {showStarAnimation &&
      <AnimationStarFlying setVisible={setShowStarAnimation} />
      }
      {showConfettiAnimation &&
        <AnimationConfetti setVisible={setShowConfettiAnimation}/>
      }
    </Box>
  )
}

export default App