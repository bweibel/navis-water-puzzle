import React, {useState} from 'react';
import Timer             from './components/Timer';
import Bucket            from './components/Bucket';
import GoalBucket        from './components/GoalBucket';
import Steps             from './components/Steps';

import './Game.css';

/*************************************************************************************
Component: Game

Game Logic Component
**************************************************************************************/
function Game(props){

  const [hasWon, setHasWon] = useState(false);
  const [steps, setSteps] = useState(0);
  const [buckets, setBuckets] = useState(props.defaultBuckets);
  const [goalBucket, setGoalBucket] = useState(props.defaultGoalBucket);

  // emptyBucket
  const emptyBucket = (id) => {
    setBuckets(modifyWaterAmount(id, 0));
    setSteps(steps + 1);
  }

  // emptyGoal
  const emptyGoal = () => {
    setGoalBucket({...goalBucket, waterCount: 0});
  }

  // fillBucket
  const fillBucket = (id, capacity) => {
    setBuckets(modifyWaterAmount(id, capacity));
    setSteps(steps + 1);
  }

  // modifyWaterAmount
  // modifies the water in the bucket with the given ID and returns a new bucket list
  // defaults to using the main game bucketList
  const modifyWaterAmount = (id, newAmount, bucketList=buckets) => {
    const newBuckets = bucketList.map( bucket => {
      if(id === bucket.id){
        return {
          ...bucket,
          waterCount: newAmount
        }
      } else {
        return {
          ...bucket
        }
      }
    });
    return newBuckets;
  }

  // transferWater
  // moves as much water as possible from one bucket to another
  const transferWater = (givingBucket, recievingBucket) => {
    const recievingMax = recievingBucket.capacity - recievingBucket.waterCount;
    let givingCount;

    // Can the amount of water in the giving bucket fit in the recieving bucket?
    if( givingBucket.waterCount <= recievingMax ){
      givingCount = givingBucket.waterCount;
    } else {
      givingCount = recievingMax;
    }

    // Get a new Bucket list with both recieving and giving buckets updated
    let newBuckets = modifyWaterAmount(givingBucket.id, givingBucket.waterCount-givingCount);
    newBuckets = modifyWaterAmount(recievingBucket.id, recievingBucket.waterCount+givingCount, newBuckets);

    setBuckets(newBuckets);
    setSteps(steps + 1);
  }

  // Render function for a Single Bucket
  const renderBucket = (bucket) =>{
    let handleTransferClick;
    const otherBuckets = buckets.filter(otherBucket => otherBucket.id !== bucket.id);

    if(otherBuckets.length <= 1){
      handleTransferClick = () => {
        transferWater(bucket, otherBuckets[0]);
      };
    } else {
      // This would need to be able to display multiple transfer buttons for all other buckets.
      // Since this is outside the scope of this project (only two buckets) I'll leave it blank
    }

    return(
      <Bucket 
        key={bucket.id} 
        capacity={bucket.capacity}
        waterCount={bucket.waterCount}
        handleEmptyClick={ ()=> emptyBucket(bucket.id)}
        handleFillClick={ ()=> fillBucket(bucket.id, bucket.capacity)}
        handleTransferClick={ handleTransferClick }
        handleGoalClick={ ()=> transferToGoal(bucket)}
        isDisabled={goalBucket.waterCount}  
      />
    ) 
  }

  // Transfer water to the goal bucket and check for a win
  const transferToGoal = (bucket) => {
    if(!goalBucket.waterCount){
      const newGoalBucket = {...goalBucket, waterCount: bucket.waterCount}; 
      emptyBucket(bucket.id);
      setGoalBucket(newGoalBucket);
      setHasWon(bucket.waterCount === goalBucket.goal);
    }
  }

  // Reset Game to defaults
  const resetGame = () => {
    setHasWon(false);
    setSteps(0);
    setBuckets(props.defaultBuckets);
    setGoalBucket(props.defaultGoalBucket);
  }

  return (
    <div className="Game">
      <header className="game-header">
        <h1>Water Pouring Riddle</h1>
      </header>

      {hasWon && <div className="win-message">You Win!</div>}

      <ul className="bucket-list">
        {buckets.map((bucket)=> renderBucket(bucket))}
      </ul>

      <GoalBucket
        goal={goalBucket.goal}
        waterCount={goalBucket.waterCount}
        handleEmptyClick={ ()=> emptyGoal()}
      />

      <footer>
        [ <Timer /> ] [ <Steps value={steps}/> ]
        <button onClick={ ()=>resetGame()}>Reset</button>
      </footer>
    </div>
  );  
}

export default Game;
