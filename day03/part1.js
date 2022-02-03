// const input = require('./input');

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const inputArray = testInput.split('\n');

// most common first bit is the first bit of the gamma rate

// least common bit is epsilon bit

const mostCommonBitMap = new Map;

for(let i = 0; i < inputArray.length; i++) {
  const diagnosticBinary = inputArray[i];
  for(let j = 0; j < diagnosticBinary.length; j++) {
    const bit = diagnosticBinary[j];
    // j will tell me which bit
    if(bit === '0') {
      if(mostCommonBitMap.has(j)) {
        const newBitCount = mostCommonBitMap.get(j);
        newBitCount.zero = newBitCount.zero + 1;
        mostCommonBitMap.set(j, newBitCount);
      } else {
        mostCommonBitMap.set(j, { zero: 1, one: 0 });
      }
    } else {
      if(mostCommonBitMap.has(j)) {
        const newBitCount = mostCommonBitMap.get(j);
        newBitCount.one = newBitCount.one + 1;
        mostCommonBitMap.set(j, newBitCount);
      } else {
        mostCommonBitMap.set(j, { zero: 0, one: 1 });
      }
    }
  }
  
}

let oxygenRating = new Array(...inputArray);
let co2Rating = new Array(...inputArray);

mostCommonBitMap.forEach((bitCount, bitIndex) => {
  const { zero, one } = bitCount;
  if(zero > one) {
    // if the bitIndex is zero keep it, else pop
    for(let i = 0; i < oxygenRating.length; i++) {
      if(oxygenRating.length === 1) break;
      const binaryString = oxygenRating[i];
      if(binaryString[bitIndex] !== '0') {
        oxygenRating.splice(i, 1);
        i--;
      }
    }
      
    for(let i = 0; i < co2Rating.length; i++) {
      if(co2Rating.length === 1) break;
      const binaryString = co2Rating[i];
      if(binaryString[bitIndex] === '0') {
        co2Rating.splice(i, 1);
        i--;
      }
    }
  } else {
    for(let i = 0; i < oxygenRating.length; i++) {
      if(oxygenRating.length === 1) break;
      const binaryString = oxygenRating[i];
      if(binaryString[bitIndex] === '0') {
        oxygenRating.splice(i, 1);
        i--;
      }
    }
      
    for(let i = 0; i < co2Rating.length; i++) {
      if(co2Rating.length === 1) break;
      const binaryString = co2Rating[i];
      if(binaryString[bitIndex] !== '0') {
        co2Rating.splice(i, 1);
        i--;
      }
    }
  } 
});

// let gammaRate = '';
// let epsilonRate = '';

// mostCommonBitMap.forEach((bitCount, i) => {
//   const { zero, one } = bitCount;
//   if (zero > one) {
//     gammaRate = gammaRate + '0';
//     epsilonRate = epsilonRate + '1';
//   } else {
//     gammaRate = gammaRate + '1';
//     epsilonRate = epsilonRate + '0';
//   }
// });

console.log(parseInt(oxygenRating, 2) * parseInt(co2Rating, 2));
