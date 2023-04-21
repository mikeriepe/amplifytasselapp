/* src/App.js */
import React, { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Box from '@mui/material/Box';
import Landing from './pages/Landing';
import NavBarLoggedOut from './components/NavBarLoggedOut';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBarLoggedIn from './components/NavBarLoggedIn';
import Settings from './pages/Settings';
import './stylesheets/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ViewOpportunity from './pages/ViewOpportunity';

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
        </Routes>
      </Box>
    </Box>
  )
}

export default App