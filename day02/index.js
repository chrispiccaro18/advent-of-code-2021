const input = require('./input');

const inputArray = input.split('\n');

// const inputArray = [
//   'forward 5',
//   'down 5',
//   'forward 8',
//   'up 3',
//   'down 8',
//   'forward 2',
// ]

let depth = 0;
let horizontalPosition = 0;
let aim = 0;

for (let i = 0; i < inputArray.length; i++) {
  const command = inputArray[i];
  const [direction, amountString] = command.split(' ');
  const amount = parseInt(amountString);

  
  switch (direction) {
    case 'forward':
      horizontalPosition = horizontalPosition + amount;
      depth = depth + (aim * amount);
      break;
      case 'down':
        aim = aim + amount;
        break;
        case 'up':
          aim = aim - amount;
          break;
          default:
            break;
          }
  // console.log(i, command, 'depth:', depth, 'h:', horizontalPosition, 'aim:', aim)
}

console.log(depth * horizontalPosition);
