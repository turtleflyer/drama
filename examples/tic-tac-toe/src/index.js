/* eslint-env browser */
import {
  RoleSet, eventChain, setActionOnAddElement, defineRoutine,
} from 'drama-core';
import buildMatrix from './matrix';
import {
  createCell, resetCell, setX, setO, markAsWin,
} from './cell';
import postTextMessage from './messages';
import './stage';
import restartButton from './restartButton';

const turns = ['setX', 'setO'];

const emptyCells = new RoleSet();

class Cell {
  constructor() {
    this.node = createCell();
  }
}

defineRoutine({ interpretTarget: e => e.node });

Object.assign(Cell.prototype, {
  [turns[0]]: setX,
  [turns[1]]: setO,
  markAsWin,
  resetCell,
});

const gameMatrix = buildMatrix(Cell);

emptyCells.addElements(gameMatrix);

function keepState(cell, filledCells) {
  const cellN = gameMatrix.indexOf(cell);
  return [...filledCells, cellN].sort((a, b) => a - b);
}

function analyzePossibleWin(filledCells) {
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

const cellUsedMessage = 'The cell is already set';
const gameOverMessage = 'Game is over';
const winMessages = ['X won', 'O won'];

const xAndOs = turns.map((turn, i) => {
  const set = new RoleSet();
  setActionOnAddElement(
    set,
    (() => {
      let filledCells = [];
      return ({ target, roleSet }) => {
        if (roleSet.size === 1) {
          filledCells = [];
        }
        target[turn]();
        filledCells = keepState(target, filledCells);
        const possibleWin = analyzePossibleWin(filledCells);
        if (possibleWin) {
          emptyCells.clearElements();
          xAndOs.clearElements();
          possibleWin.forEach((n) => {
            gameMatrix[n].markAsWin();
          });
          postTextMessage(winMessages[i]);
        } else if (emptyCells.size === 0) {
          xAndOs.clearElements();
          postTextMessage(gameOverMessage);
        }
      };
    })(),
  );

  eventChain({
    roleSet: set,
    type: 'mousedown',
    action() {
      postTextMessage(cellUsedMessage);
    },
  });

  return set;
});

xAndOs.clearElements = function () {
  this.forEach(set => set.clearElements());
};

function setCell(currentTurn, cell) {
  xAndOs[currentTurn].addElement(cell);
  return 1 - currentTurn;
}

eventChain({
  roleSet: emptyCells,
  type: 'click',
  action: ((firstTurn) => {
    let currentTurn = firstTurn;
    return ({ target }) => {
      currentTurn = setCell(currentTurn, target);
    };
  })(0),
});

restartButton.onclick = () => {
  gameMatrix.forEach(cell => cell.resetCell());
  emptyCells.addElements(gameMatrix);
};
