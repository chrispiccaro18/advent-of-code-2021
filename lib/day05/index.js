// part2 only horizontal, vertical, or diagonal (slope of 1, 1)
const input = require('./input');
const {
  createCordObject,
  determineSlope,
} = require('./func');

// const testInput = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`;

const rawCords = input.split('\n');
const arrayOfCordObjects = rawCords.map(createCordObject);
const cordsWithSlope = arrayOfCordObjects.filter(determineSlope);

cordsWithSlope.forEach(({
  x1,
  x2,
  y1,
  y2,
  horizontalOrVertical,
  touches,
}) => {
  if(horizontalOrVertical === 'vertical') {
    const length = x1 - x2;
    if(length > 0) {
      for(let i = 0; i < length + 1; i++) {
        touches.push(`${i + x2}, ${y1}`);
        
      }
    } else {
      for(let i = 0; i < Math.abs(length) + 1; i++) {
        touches.push(`${i + x1}, ${y1}`);
      }
    }
  } else if(horizontalOrVertical === 'horizontal') {
    const length = y1 - y2;
    if(length > 0) {
      for(let i = 0; i < length + 1; i++) {
        touches.push(`${x1}, ${i + y2}`);
        
      }
    } else {
      for(let i = 0; i < Math.abs(length) + 1; i++) {
        touches.push(`${x1}, ${i + y1}`);
      }
    }
  } else {
    const length = Math.abs(x1 - x2);
    if(x1 > x2 && y1 > y2) {
      for(let i = 0; i < length + 1; i++) {
        touches.push(`${x2 + i}, ${y2 + i}`);        
      }
    } else if(x1 > x2 && y1 < y2) {
      for(let i = 0; i < length + 1; i++) {
        touches.push(`${x2 + i}, ${y2 - i}`);        
      }
    } else if(x1 < x2 && y1 < y2) {
      for(let i = 0; i < length + 1; i++) {
        touches.push(`${x1 + i}, ${y1 + i}`);
      }
    } else if(x1 < x2 && y1 > y2) {
      for(let i = 0; i < length + 1; i++) {
        touches.push(`${x1 + i}, ${y1 - i}`);        
      }
    }
  }
});

const overlaps = new Map();
cordsWithSlope.forEach(({ touches }) => {
  touches.forEach(cord => {
    if(overlaps.has(cord)) {
      const oldCount = overlaps.get(cord);
      overlaps.set(cord, oldCount + 1);
    } else {
      overlaps.set(cord, 1);
    }
  });
});

let overlapCount = 0;

overlaps.forEach(value => {
  if(value > 1) overlapCount++;
});

console.log(overlapCount);
