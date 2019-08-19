import React from 'react';
import Water from './Water';

/*************************************************************************************
 Component: Bucket
*************************************************************************************/
function Bucket(props){
    let goalBtnClassName = '';
    if(props.isDisabled){
      goalBtnClassName += 'disabled';
    }

    return (
      <li className="bucket" onClick={props.handleBucketClick}>
        <span className="amount">{props.waterCount} of {props.capacity}</span>
        <Water waterPercent ={ Math.round((props.waterCount/props.capacity)*100)/100  }/>
        <div className="buttons">
          <button onClick={props.handleEmptyClick}>Empty</button>
          <button onClick={props.handleFillClick}>Fill</button>
          <button onClick={props.handleTransferClick}>Transfer</button>
          <button className={goalBtnClassName} onClick={props.handleGoalClick}>Send to Goal</button>
        </div>
      </li>
    );
} 

export default Bucket;