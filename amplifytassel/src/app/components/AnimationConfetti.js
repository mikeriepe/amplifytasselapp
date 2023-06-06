import React from 'react';
import Confetti from 'react-confetti';

/**
 * @param setVisible passed in state get sets to false after the animation ends
 * @return {HTML} Confetti animation 
 */

export default function AnimationConfetti({setVisible}) {
  const height = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  const width = window.innerWidth;

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
