// const { createNewFish } = require('./func');
// const input = require('./input');
const testInput = '3,4,3,1,2';

const DAYS = 80;

const initialFish = testInput
  .split(',')
  .map(days => {
    return parseInt(days);
  });

let todaysFish = [...initialFish];

for(let i = 0; i < DAYS; i++) {
  let tomorrowsFish = [];
  let newFishToday = 0;

  todaysFish.forEach(fish => {
    // check timer
    if(fish === 0) {
      newFishToday++;
      tomorrowsFish.push(6);
    } else {
      // decrease timer
      tomorrowsFish.push(fish - 1);
    }
  });

  todaysFish = [...tomorrowsFish];
  for(let j = 0; j < newFishToday; j++) {
    todaysFish.push(8);
  }
  tomorrowsFish = [];
}

console.log(todaysFish.length);
