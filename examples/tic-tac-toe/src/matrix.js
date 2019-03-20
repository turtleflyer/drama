/* eslint-env browser */

export const matrixContainer = document.createElement('div');

function buildMatrix(Cell) {
  const matrix = [];

  for (let i = 0; i < 9; i++) {
    const cell = new Cell();
    matrixContainer.appendChild(cell.node);
    matrix.push(cell);
    if ((i + 1) % 3 === 0) {
      matrixContainer.appendChild(document.createElement('br'));
    }
  }

  return matrix;
}

export default buildMatrix;
