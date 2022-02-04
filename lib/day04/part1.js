const { 
  createBoardMapAndDrawArray,
} = require('./func');
const fullInput = require('./input');
// const testInput = require('./testInput');

const { boardMap, drawNumbersArray } = createBoardMapAndDrawArray(fullInput);

let isWinnerFound = false;

// delete numbers as they appear 
// loop through draw numbers
for(let i = 0; i < drawNumbersArray.length; i++) {
  if(isWinnerFound) break;

  const drawNumber = drawNumbersArray[i];
  //  loop through each board
  for(let j = 0; j < boardMap.length; j++) {
    //    check to see if any rows or columns are empty (flip a bool?)
    if(isWinnerFound) break;

    const board = boardMap[j];
    const { rows, columns } = board;
    //    loop through each row
    for(let k = 0; k < rows.length; k++) {
      if(isWinnerFound) break;

      const row = rows[k];
      const indexOfCalledNumber = row.findIndex(number => parseInt(number) === parseInt(drawNumber));
      if(indexOfCalledNumber === -1) continue;
      rows[k].splice(indexOfCalledNumber, 1);
      //    check to see if any rows are empty (flip a bool?)
      if(rows[k].length === 0) isWinnerFound = { board, drawNumber };
    }
    //    loop through each column
    for(let k = 0; k < columns.length; k++) {
      if(isWinnerFound) break;

      const column = columns[k];
      const indexOfCalledNumber = column.findIndex(number => parseInt(number) === parseInt(drawNumber));
      if(indexOfCalledNumber === -1) continue;
      columns[k].splice(indexOfCalledNumber, 1);
      //    check to see if any columns are empty (flip a bool?)
      if(columns[k].length === 0) isWinnerFound = { board, drawNumber };
    }
  }
}

// sum all unmarked numbers and multiply by number just called
const sumOfUnmarkedNumbers = isWinnerFound.board.rows.reduce((sum, row) => {
  const sumOfRow = row.reduce((sumOfRow, number) => {
    return sumOfRow + parseInt(number);
  }, 0);
  return sum + sumOfRow;
}, 0);

console.log(sumOfUnmarkedNumbers * isWinnerFound.drawNumber);
