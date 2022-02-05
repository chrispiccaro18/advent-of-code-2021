const createBoardMapAndDrawArray = stringInput => {
  const inputArray = stringInput.split('\n');

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
        won: false,
      };
      boardMap[boardNumber] = newBoard;
    } else {
      const oldBoard = boardMap[boardNumber];
      const { rows, original } = oldBoard;
      const newRows = [...rows, stringFrag];
      const spaceNeeded = !stringFrag[0] ? '' : ' ';
      const newOriginal = original + spaceNeeded + stringFrag;
      boardMap[boardNumber] = { ...oldBoard, rows: newRows, original: newOriginal };
    }

    if(!originalArray[i + 1]) {
      const finishedBoardMap = createRowsAndColumns(boardMap, boardNumber);
      boardNumber++;
      return finishedBoardMap;
    }

    return boardMap;
  }, []);

  return { boardMap, drawNumbersArray };
};

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

const sumUnmarkedNumbers = (board) => board.rows.reduce((sum, row) => {
  const sumOfRow = row.reduce((sumOfRow, number) => {
    return sumOfRow + parseInt(number);
  }, 0);
  return sum + sumOfRow;
}, 0);

module.exports = {
  createBoardMapAndDrawArray,
  createRowsAndColumns,
  sumUnmarkedNumbers,
};
