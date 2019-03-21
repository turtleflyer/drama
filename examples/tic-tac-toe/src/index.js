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
import analyzePossibleWin from './analyzePossibleWin';
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
