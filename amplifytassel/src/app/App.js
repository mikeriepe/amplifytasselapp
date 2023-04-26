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
import NavBarLoggedIn from './components/NavBarLoggedIn';
import Settings from './pages/Settings';
import './stylesheets/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ViewOpportunity from './pages/ViewOpportunity';
import Opportunities from './pages/Opportunities';
import MyProfile from './pages/MyProfile';
import ViewProfile from './pages/ViewProfile';

import useAuth from './util/AuthContext';
import { Amplify} from 'aws-amplify'
import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {
  const {userProfile} = useAuth();
  return (
    <Box sx={{display: 'flex'}}>
      <ToastContainer />
      {userProfile !== null ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
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
        </Routes>
      </Box>
    </Box>
  )
}

export default App