/*************************************************************************************
  Water Riddle
  Authors: Ben Weibel for NAVIS Take Home Exercise 

  A simulation of the classic "Water Bucket" Riddle 
  (https://en.wikipedia.org/wiki/Water_pouring_puzzle)
*************************************************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';

const defaultBuckets = [
      {
        id: 0,
        capacity: 3,
        waterCount: 0
      },
      {
        id: 1,
        capacity: 5,
        waterCount: 0
      }
    ];
const defaultGoalBucket = {
      waterCount: 0,
      goal: 4
    };

ReactDOM.render(
    <Game 
        defaultBuckets={defaultBuckets}
        defaultGoalBucket={defaultGoalBucket}
    />, 
    document.getElementById('root'));

