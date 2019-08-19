import React from 'react';
import Water from './Water';

/*************************************************************************************
 Component: GoalBucket

 Props:
  Capacity: Goal amount the bucket should hold to win
  waterCount: Total amount of water currently in the bucket

  We render the goal at 70% of the way up the bucket. This is just for aesthetics,
  but in real life if the goal was to simply fill the goal bucket completely it would
  be easy to cheat!
*************************************************************************************/
function GoalBucket(props){
  const isCorrect = props.waterCount === props.goal;
    return (
      <div className="bucket goal-bucket" onClick={props.handleBucketClick}>
        <span className="amount">{props.waterCount} of {props.goal}</span>
        <div className="goal-message">
          {props.waterCount !== 0  && 
            (isCorrect ? '👍' : '❌')
          }
        </div>

        <Water waterPercent={ Math.round((props.waterCount/props.goal)*70)/100  }/>
        <Water waterPercent={0.70} goalWater={true}/>

        {!isCorrect && 
          <div className="buttons">
            <button onClick={props.handleEmptyClick}>Empty Bucket</button>
          </div>
        }

      </div>
    );
} 

export default GoalBucket;