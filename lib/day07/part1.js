const input = require('./input');
// const testInput = '16,1,2,0,4,2,7,1,2,14';

const compare = (a, b) => a - b;

const sortedInput = input.split(',').map(stringInt => parseInt(stringInt)).sort(compare);

let middleIndices = 0;
if(sortedInput.length % 2 === 0) {
  middleIndices = [sortedInput.length / 2, (sortedInput.length / 2) - 1];
}

const median = (sortedInput[middleIndices[0]] + sortedInput[middleIndices[1]]) / 2;

const determineDistanceFromMedian = (number, median) => Math.abs(number - median);

const totalFuel = sortedInput.reduce((totalFuel, number) => {
  return totalFuel + determineDistanceFromMedian(number, median);
}, 0);

console.log(totalFuel);
