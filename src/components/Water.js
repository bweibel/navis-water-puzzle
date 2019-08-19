import React from 'react';

/*************************************************************************************
Component: Water

Renders the amount of water in a bucket
Props: 
  waterPercent: the amount of water currently in the bucket as a percentage (0 - 100)
**************************************************************************************/
function Water(props){
  const classNames = "water" + (props.goalWater ? " goal-water" : "");

  return(
    <div className={classNames} style={{transform: 'ScaleY(' + props.waterPercent + ')'}}></div>
  )
}


export default Water;