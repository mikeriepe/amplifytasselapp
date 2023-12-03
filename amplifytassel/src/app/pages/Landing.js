import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../util/AuthContext';
import '../stylesheets/Landing.css';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user != null) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className='Landing'>
      <div className='title'>
        <h1 className='ACmmTitle' id='landingTitle'>Tassel Volunteering</h1>
        <h2 className='secondaryTitle'>Connect alumni with their alma mater</h2>
      </div>
    </div>
  );
}
//Landing.js changes: hook up useAuth to redirect you to myprofile if it detects you're already logged in