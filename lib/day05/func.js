const cordRegex = /(\d+)/g;

const createCordObject = cords => {
  const cordArray = cords.match(cordRegex);
  return {
    x1: parseInt(cordArray[0]),
    y1: parseInt(cordArray[1]),
    x2: parseInt(cordArray[2]),
    y2: parseInt(cordArray[3]),
    rawCords: cords
  };
};

// horizontal or vertical x1 = x2 or y1 = y2
const isVertical = cord => cord.y1 === cord.y2;
const isHorizontal = cord => cord.x1 === cord.x2;

module.exports = {
  createCordObject,
  isVertical,
  isHorizontal,
};
