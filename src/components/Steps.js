import React from 'react'

/*************************************************************************************
Component: Steps

Displays the amount of steps a player has used on the riddle
**************************************************************************************/
function Steps(props){
  return  (
    <span className="steps">Steps Taken: {props.value}</span>
  );
}

export default Steps;