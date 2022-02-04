// part 1
const fullInput = require('./input');
// const testInput = require('./testInput');

const inputArray = fullInput.split('\n');

const createRowsAndColumns = (boardMap, boardNumber) => {
  const { rows } = boardMap[boardNumber];
  const arrayOfRows = rows.map(row => row.split(' ').filter(number => !!number));

  const columns = arrayOfRows.reduce((columns, row) => {
    row.map((number, i) => {
      if(!columns[i]) {
        columns[i] = [number];
      } else {
        columns[i] = [...columns[i], number];
      }
    });
    return columns;
  }, []);

  boardMap[boardNumber].rows = arrayOfRows;
  boardMap[boardNumber].columns = columns;

  return boardMap;
};

const drawNumbers = inputArray.shift();
const drawNumbersArray = drawNumbers.split(',');
// get rid of first empty string
inputArray.shift();

let boardNumber = 0;

const boardMap = inputArray.reduce((boardMap, stringFrag, i, originalArray) => {
  if(!stringFrag) return boardMap;

  if(!boardMap[boardNumber]) {
    const newBoard = {
      rows: [stringFrag],
      original: stringFrag,
    };
    boardMap[boardNumber] = newBoard;
  } else {
    const { rows, original } = boardMap[boardNumber];
    const newRows = [...rows, stringFrag];
    const spaceNeeded = !stringFrag[0] ? '' : ' ';
    const newOriginal = original + spaceNeeded + stringFrag;
    boardMap[boardNumber] = { rows: newRows, original: newOriginal };
  }

  if(!originalArray[i + 1]) {
    const finishedBoardMap = createRowsAndColumns(boardMap, boardNumber);
    boardNumber++;
    return finishedBoardMap;
  }

  return boardMap;
}, []);

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

// part 2
// find last to win
// similar process, but add winners to a winner array
// when original array has only one and that board wins, calculate score
