import React, { useState } from 'react';

import { DataStore } from '@aws-amplify/datastore';
import { KeywordProfile } from '../../models';

// Animation Libraries
import AnimationStarFlying from '../components/AnimationStarFlying';
import AnimationConfetti from '../components/AnimationConfetti';
/**
 * creates settings page
 * @return {HTML} settings page
 */
export default function Settings() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStar, setShowStar] = useState(false)
  
  const testQuery = () => {
    let profileIds = ['2cda8741-543a-4614-83cc-c28fae98adf2', '03bc5db5-46b3-4100-942b-e9ddb89ec1cc'];
    DataStore.query(KeywordProfile, k => k)
      .then((kpRelationship) => {
        console.log('kpRelationship', kpRelationship);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className='Settings'>
      <h1>Settings</h1>
      <button onClick={testQuery}>test</button>
      <button onClick={() => {setShowStar(true)}}>Star Button</button>
      {showStar &&
        <AnimationStarFlying setVisible={setShowStar} />
      }
      <button onClick={() => {setShowConfetti(true)}}>Confetti</button>
      {showConfetti &&
        <AnimationConfetti setVisible={setShowConfetti}/>
      }
    </div>
  );
}
