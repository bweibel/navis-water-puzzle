import React, { useState, useEffect } from 'react'

/*************************************************************************************
Component: Timer

Displays the amount of time a player has spent on the riddle
**************************************************************************************/
function Timer(){
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  function toggle(){
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(true);
  }

  useEffect(()=> {
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if(!isActive && seconds !== 0){
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return(
    <span className="timer">Time Elapsed: <span className="time">{Math.floor(seconds / 60)}m {seconds % 60}s</span></span>
  );
}

export default Timer;