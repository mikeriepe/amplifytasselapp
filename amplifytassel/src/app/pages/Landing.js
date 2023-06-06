import * as React from 'react';
import '../stylesheets/Landing.css';

// import useAuth from '../util/AuthContext';
/**
 * creates landing page
 * @return {HTML} Landing page
 */
export default function Landing() {
  return (
    <div className='Landing'>
      <div className='title'>
        <h1 className='ACmmTitle' id='landingTitle'>Tassel Volunteering</h1>
        <h2 className='secondaryTitle'>Connect alumni with their alma mater</h2>
      </div>
    </div>
  );
}
