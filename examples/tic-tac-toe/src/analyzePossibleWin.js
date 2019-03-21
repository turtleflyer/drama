export default function analyzePossibleWin(filledCells) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const pattern of winPatterns) {
    let winCells = [];
    for (const cellN of pattern) {
      if (filledCells.includes(cellN)) {
        winCells.push(cellN);
      } else {
        winCells = [];
        break;
      }
    }
    if (winCells.length > 0) {
      return winCells;
    }
  }
  return false;
}
