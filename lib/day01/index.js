const input = require('./input');
// const inputArray = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const inputArray = input.split('\n').map(int => parseInt(int));

// part 1
// const increases = inputArray.reduce((increaseCount, currentInt, i) => {
//   if(i === 0) return increaseCount;
//   if(currentInt > inputArray[i-1]) {
//     return increaseCount + 1;
//   } else return increaseCount;
// }, 0);

// console.log(increases);

let increases = 0;
let previousWindow = 0;

// loop through array
for(let i = 0; i < inputArray.length; i++) {
  // add i + (i+1) + (i+2)
  const currentWindow = inputArray[i] + inputArray[i + 1] + inputArray[i + 2];

  if(i !== 0) {
    if(currentWindow > previousWindow) increases++;
  }

  // set currentWindow to previousWindow
  previousWindow = currentWindow;

  // make sure there are 3 numbers coming or is i greater than length of array or that i + 2 is less than or equal to array length - 1
  if(i + 2 > inputArray.length - 1) {
    break;
  }
}

console.log(increases);
