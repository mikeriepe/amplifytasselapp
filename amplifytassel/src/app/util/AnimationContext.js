import React, {useContext, createContext, useState} from 'react';

// initializes context
const AnimationContext = createContext();

/**
 * component that provides authcontext
 * @param {*} props things passed in
 * @return {JSX} animation provider for animation context
 */
export function AnimationProvider(props) {
  
  const [showStarAnimation, setShowStarAnimation] = useState(false);
  const [showConfettiAnimation, setShowConfettiAnimation] = useState(false);

  return (
    <>
        <AnimationContext.Provider
          value={{
            showStarAnimation,
            setShowStarAnimation,
            showConfettiAnimation,
            setShowConfettiAnimation,
          }}
        >
          {props.children}
        </AnimationContext.Provider>
    </>
  );
}

/**
 * allows other components to use auth
 * @return {context} user
 */
export default function useAnimation() {
  return useContext(AnimationContext);
}
