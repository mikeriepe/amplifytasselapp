import React from 'react';
import Confetti from 'react-confetti';

/**
 * @param setVisible passed in state get sets to false after the animation ends
 * @return {HTML} Confetti animation 
 */

export default function AnimationConfetti({setVisible}) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={2000}
      tweenDuration={10000}
      onConfettiComplete={() => {setVisible(false)}}
    />
  );
}
