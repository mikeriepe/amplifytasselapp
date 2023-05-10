import React, {useState, useRef, useEffect} from 'react';
import useAuth from '../util/AuthContext';

import { DataStore } from '@aws-amplify/datastore';
import { Keyword, KeywordProfile, Profile } from '../../models';

// Animation Libraries
import Confetti from 'react-confetti'
import useWindowSize from "../util/useWindowSize"
import { animated, useSpring, useSprings, useSpringRef, useChain, useTransition, useTrail } from '@react-spring/web'
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const StarFalling = ({ windowWidth, windowHeight, hideAnimation, children }) => {
  const firstStep = useSpring({
    from: { position: "absolute", opacity: 0, x: (windowWidth/windowHeight) * 200, y: windowHeight - 200},
    to: [
      { opacity: 1, x: (windowWidth/windowHeight) * 500, y: windowHeight - 500},
      { opacity: 0, x: windowWidth - (windowWidth/windowHeight) * 200, y: 200, onRest: hideAnimation},
    ],
    config: {
      friction: 40,
    },
  })

  return (
    <animated.div style={firstStep}>
      {children}
    </animated.div>
  )
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

  const hideAnimation = () => {
    setFadeVisible(false);
  };
  
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
      {fadeVisible &&
        <StarFalling windowWidth={width} windowHeight={height} hideAnimation={hideAnimation}>
          <StarRoundedIcon
            className='icon-yellow'
            sx={{mr: 3, transform: 'scale(3)'}}
          />
        </StarFalling>
      }
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
