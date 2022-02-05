// part 2
// find last to win
// similar process, but add winners to a winner array
// when original array has only one and that board wins, calculate score

const { 
  createBoardMapAndDrawArray,
  sumUnmarkedNumbers,
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
    for(let k = 0; k < rows.length; k++) {
      if(stillPlayingArray.length === 0) break;

      const row = rows[k];
      const indexOfCalledNumber = row.findIndex(number => parseInt(number) === parseInt(drawNumber));
      if(indexOfCalledNumber === -1) continue;

      rows[k].splice(indexOfCalledNumber, 1);

      if(rows[k].length === 0) {
        board.won = true;
        winnersArray.push({ board, drawNumber });
        stillPlayingArray.splice(j, 1);
      }
    }

    //    loop through each column
    for(let k = 0; k < columns.length; k++) {
      if(stillPlayingArray.length === 0) break;

      const column = columns[k];
      const indexOfCalledNumber = column.findIndex(number => parseInt(number) === parseInt(drawNumber));
      if(indexOfCalledNumber === -1) continue;

      columns[k].splice(indexOfCalledNumber, 1);

      if(columns[k].length === 0) {
        board.won = true;
        winnersArray.push({ board, drawNumber });
        stillPlayingArray.splice(j, 1);
      }
    }
  }
}

const lastToWin = winnersArray[winnersArray.length - 1];
const sumOfLastToWin = sumUnmarkedNumbers(lastToWin.board);

console.log(sumOfLastToWin * lastToWin.drawNumber);
