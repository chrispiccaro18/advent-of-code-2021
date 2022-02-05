// const input = require('./input');
const { createCordObject, isHorizontal, isVertical } = require('./func');

// x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. 
// lineSegment = {
//   x1: 0,
//   y1: 9,
//   x2: 5,
//   x2: 9,
//   horizontalOrVertical: 'vertical',
//   touches: ['0,9', '1,9', '2,9', '3,9', '4,9', '5,9']
// }

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const rawCords = testInput.split('\n');
const arrayOfCordObjects = rawCords.map(createCordObject);

// TODO: add vertical and horizontal logic
console.log(isHorizontal(arrayOfCordObjects[0]));
console.log(isVertical(arrayOfCordObjects[0]));

// based on horizontal or vertical, calculate points it touches
// vertical we use x cords. find which x is lower, add cord to touchesArray, loop (using absolute value of x1 - x2 + 1) increasing x every loop

// later we check the overlaps


