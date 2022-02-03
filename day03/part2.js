const input = require('./input');

const createCommonBitMap = array => {
  const mostCommonBitMap = [];

  for(let i = 0; i < array.length; i++) {
    const diagnosticBinary = array[i];
    for(let j = 0; j < diagnosticBinary.length; j++) {
      const bit = diagnosticBinary[j];
      // j will tell me which bit
      if(bit === '0') {
        if(mostCommonBitMap[j]) {
          mostCommonBitMap[j].zero = mostCommonBitMap[j].zero + 1;
        } else {
          mostCommonBitMap[j] = { zero: 1, one: 0 };
        }
      } else {
        if(mostCommonBitMap[j]) {
          mostCommonBitMap[j].one = mostCommonBitMap[j].one + 1;
        } else {
          mostCommonBitMap[j] = { zero: 0, one: 1 };
        }
      }
    }
  }
  return mostCommonBitMap;
};

// const testInput = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`;

const inputArray = input.split('\n');

const oxygenRating = new Array(...inputArray);
const co2Rating = new Array(...inputArray);

let oxygenBitMap = createCommonBitMap(oxygenRating);
let co2BitMap = createCommonBitMap(co2Rating);

for(let i = 0; i < oxygenBitMap.length; i++) {
  const bitCount = oxygenBitMap[i];
  const { zero, one } = bitCount;
  // TODO: do the zero and one check here, based on this function in next loop
  
  for(let j = 0; j < oxygenRating.length; j++) {
    if(oxygenRating.length === 1) break;
    const binaryString = oxygenRating[j];
    if(zero > one) {
      // only keep stings with 0 in i position;
      if(binaryString[i] !== '0') {
        oxygenRating.splice(j, 1);
        j--;
      }
    } else {
      if(binaryString[i] !== '1') {
        oxygenRating.splice(j, 1);
        j--;
      }
    }
  
  }
  oxygenBitMap = createCommonBitMap(oxygenRating);
}

for(let i = 0; i < co2BitMap.length; i++) {
  const bitCount = co2BitMap[i];
  const { zero, one } = bitCount;
  // TODO: do the zero and one check here, based on this function in next loop
  
  for(let j = 0; j < co2Rating.length; j++) {
    if(co2Rating.length === 1) break;
    const binaryString = co2Rating[j];
    if(zero > one) {
      // only keep stings with 1 in i position;
      if(binaryString[i] === '0') {
        co2Rating.splice(j, 1);
        j--;
      }
    } else {
      if(binaryString[i] === '1') {
        co2Rating.splice(j, 1);
        j--;
      }
    }
  
  }
  co2BitMap = createCommonBitMap(co2Rating);
}


console.log(parseInt(oxygenRating, 2) * parseInt(co2Rating, 2));

// {
//   bitPostion: 0,
//   zeros: 5,
//   ones: 7,
//   dominant: 'ones',
//   matchingBinaryStrings: [ '11110', '10101' ],
// },
// {
//   bitPostion: 2,
//   zeros: 7,
//   ones: 5,
//   dominant: 'zeros',
//   matchingBinaryStrings: [ '11110', '11101' ],
// }
