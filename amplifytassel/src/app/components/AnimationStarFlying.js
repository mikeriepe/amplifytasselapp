import React from 'react';

// Animation Libraries
import { animated, useSpring } from '@react-spring/web'
import StarRoundedIcon from '@mui/icons-material/StarRounded';  

/**
 * @param setVisible passed in state get sets to false after the animation ends
 * @return {HTML} tassel star animation flying from bottom left to top right 
 */

export default function AnimationStarFlying({setVisible}) {
  // const {width, height} = useWindowSize();
  const width = window.innerWidth;
  const height = window.innerHeight;

  const firstStep = useSpring({
    from: { position: "absolute", opacity: 0, x: width * 0.3, y: window.pageYOffset + height * 0.7},
    to: [
      { opacity: 1, x: width * 0.50, y: window.pageYOffset + height * 0.50},
      { opacity: 0, x: width * 0.90, y: window.pageYOffset + height * 0.10, onRest: () => {setVisible(false);}},
    ],
    config: {
      friction: 30,
    },
  })

  return (
    <>
      {width && height && 
        <animated.div style={firstStep}>
          <StarRoundedIcon
            className='icon-yellow'
            sx={{mr: 3, transform: 'scale(3)'}}
          />
        </animated.div> 
      }
    </>
  );
}
