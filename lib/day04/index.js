// part 2
// find last to win
// similar process, but add winners to a winner array
// when original array has only one and that board wins, calculate score

const { 
  createBoardMapAndDrawArray,
  sumUnmarkedNumbers,
  findCalledNumber,
} = require('./func');
const input = require('./input');
// const testInput = require('./testInput');

const { boardMap, drawNumbersArray } = createBoardMapAndDrawArray(input);

const winnersArray = [];
const stillPlayingArray = [...boardMap];

for(let i = 0; i < drawNumbersArray.length; i++) {
  // if stillPlayingArray is empty, exit the loop
  if(stillPlayingArray.length === 0) break;
  const drawNumber = drawNumbersArray[i];

  //  loop through each board
  for(let j = 0; j < boardMap.length; j++) {
    const board = boardMap[j];
    if(board.won) continue;
    const { rows, columns } = board;

    //    loop through each row
    findCalledNumber(rows, stillPlayingArray, board, winnersArray, drawNumber, j);

    //    loop through each column
    findCalledNumber(columns, stillPlayingArray, board, winnersArray, drawNumber, j);
  }
}

const lastToWin = winnersArray[winnersArray.length - 1];
const sumOfLastToWin = sumUnmarkedNumbers(lastToWin.board);

console.log(sumOfLastToWin * lastToWin.drawNumber);
