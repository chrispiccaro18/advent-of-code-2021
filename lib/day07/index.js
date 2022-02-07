const input = require('./input');
// const testInput = '16,1,2,0,4,2,7,1,2,14';

const inputArray = input.split(',').map(stringInt => parseInt(stringInt));
const inputTotal = inputArray.reduce((total, number) => {
  return total + number;
}, 0);
// could check if rounding up or down would be better fuel-wise
const avgInt = parseInt(inputTotal / inputArray.length);
console.log(avgInt);

const determineDistanceFromAvg = (number, avg) => Math.abs(number - avg);
const determineFuelUsed = distance => {
  if(distance !== 0) {
    return distance + determineFuelUsed(distance - 1);
  } else return distance;
};

const totalFuel = inputArray.reduce((totalFuel, number) => {
  const distanceFromMedian = determineDistanceFromAvg(number, avgInt);
  const fuelUsed = determineFuelUsed(distanceFromMedian);
  return totalFuel + fuelUsed;
}, 0);

console.log(totalFuel);
