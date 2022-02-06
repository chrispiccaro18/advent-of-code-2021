// part2
const input = require('./input');
// const testInput = '3,4,3,1,2';

const DAYS = 256;

const fishMap = new Map();
for(let i = 0; i < 9; i++) fishMap.set(i, 0);

input.split(',').forEach(fish => {
  const intFish = parseInt(fish);
  const currentFish = fishMap.get(intFish);
  fishMap.set(intFish, currentFish + 1);
});

for(let i = 0; i < DAYS; i++) {
  const fishInZero = fishMap.get(0);

  for(let j = 1; j < 9; j++) {
    const currentFishInJ = fishMap.get(j);
    fishMap.set(j - 1, currentFishInJ);
  }

  fishMap.set(8, fishInZero);

  const fishInSix = fishMap.get(6);
  fishMap.set(6, fishInSix + fishInZero);
}

let totalFish = 0;
fishMap.forEach(fish => {
  totalFish = totalFish + fish;
});

console.log(totalFish);
