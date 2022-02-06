const input = require('./input');
const {
  createCordObject,
  determineHorizontalOrVertical,
} = require('./func');

// x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. 
// lineSegment = {
//   x1: 0,
//   y1: 9,
//   x2: 5,
//   x2: 9,
//   horizontalOrVertical: 'vertical',
//   touches: ['0,9', '1,9', '2,9', '3,9', '4,9', '5,9']
// }

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

const verticalOrHorizontalCords = arrayOfCordObjects.filter(determineHorizontalOrVertical);

// based on horizontal or vertical, calculate points it touches
// vertical we use x cords. find which x is lower, add cord to touchesArray, loop (using absolute value of x1 - x2 + 1) increasing x every loop
verticalOrHorizontalCords.forEach(cordObject => {
  if(cordObject.horizontalOrVertical === 'vertical') {
    const { x1, x2, y1 } = cordObject;
    const length = x1 - x2;
    if(length > 0) {
      for(let i = 0; i < length + 1; i++) {
        cordObject.touches.push(`${i + x2}, ${y1}`);
        
      }
    } else {
      for(let i = 0; i < Math.abs(length) + 1; i++) {
        cordObject.touches.push(`${i + x1}, ${y1}`);
      }
    }
  } else {
    const { y1, y2, x1 } = cordObject;
    const length = y1 - y2;
    if(length > 0) {
      for(let i = 0; i < length + 1; i++) {
        cordObject.touches.push(`${x1}, ${i + y2}`);
        
      }
    } else {
      for(let i = 0; i < Math.abs(length) + 1; i++) {
        cordObject.touches.push(`${x1}, ${i + y1}`);
      }
    }
  }
});

// later we check the overlaps
const overlaps = new Map();
verticalOrHorizontalCords.forEach(cordObject => {
  const { touches } = cordObject;
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
