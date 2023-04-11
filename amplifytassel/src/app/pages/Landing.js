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
        <h1 className='ACmmTitle' id='landingTitle'>AC Match Maker</h1>
        <h2 className='secondaryTitle'>connect students with alumni</h2>
      </div>
    </div>
  );
}
