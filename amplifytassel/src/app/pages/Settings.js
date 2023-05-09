import React, {useState} from 'react';
import useAuth from '../util/AuthContext';

import { DataStore } from '@aws-amplify/datastore';
import { Keyword, KeywordProfile, Profile } from '../../models';

// Animation Libraries
import Confetti from 'react-confetti'
import useWindowSize from "../util/useWindowSize"
import { animated, useSpring, useSprings } from '@react-spring/web'
import StarRoundedIcon from '@mui/icons-material/StarRounded';

// Example animation from react-spring
const StarFalling = ({ isVisible, children }) => {
  const styles = useSpring({
    position: "absolute",
    opacity: isVisible ? 1 : 0,
    y: isVisible ? 0 : 240,
    x: isVisible ? 240 : 0,
  })

  return <animated.div style={styles}>{children}</animated.div>
}

/**
 * creates settings page
 * @return {HTML} settings page
 */
export default function Settings() {
  const {user, userProfile, setUserProfile} = useAuth();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeVisible, setFadeVisible] = useState(false)
  
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
      <StarFalling isVisible={fadeVisible}>
        <StarRoundedIcon
          className='icon-yellow'
          sx={{mr: 3, transform: 'scale(2)'}}
        />
      </StarFalling>
      <button onClick={testQuery}>test</button>
      <button onClick={() => {setFadeVisible(!fadeVisible)}}>Star Button</button>
      <button onClick={() => {
        setShowConfetti(true); 
        // setTimeout(() => {setShowConfetti(false)}, 3000);
        // setTimeout(setShowConfetti(false), 3000);
      }}>Confetti</button>
      {showConfetti &&
        <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={2000}
        tweenDuration={10000}
        onConfettiComplete={() => {setShowConfetti(false)}}
        />
      }
    </div>
  );
}
