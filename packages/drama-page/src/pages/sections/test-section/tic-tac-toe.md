---
title: Examples of drama library use
orderIndex: 0
inject: ['tic-tac-toe']
---
# Examples of drama library use

### Example of Tic-tac-toe game

Лена - умная и умелая

<div id="tic-tac-toe"></div>

```javascript
// Define the class of cells that the board of tic-tac-toe
// game consists of
class Cell {
  constructor() {
    this.node = createCell();
  }
}

// interpretTarget property of the parameter passed to
// defineRoutine defines the way to reach the DOM element of
// event targets
defineRoutine({ interpretTarget: e => e.node });

// Define the messages strings
const cellMarkedMessage = 'The cell is already set';
const gameOverMessage = 'Game is over';
const winMessages = ['X won', 'O won'];

// Define the names of methods that mark cells as X and O
const turns = ['markX', 'markO'];

// Add methods to the Cell class that mark a cell as X and
// O, method that marks a cell as a part of a wining line,
// and one that resets a cell to the empty state
Object.assign(Cell.prototype, {
  [turns[0]]: markX,
  [turns[1]]: markO,
  markAsWin,
  resetCell,
});

// Build the board of the game
const gameMatrix = buildMatrix(Cell);

// Define the RoleSet containing empty cells (in the
// beginning of the game all cells are empty)
const emptyCells = new RoleSet(gameMatrix);

// Define a function keeping the record of marked cells (for
// each type of marks)
function keepState(cell, filledCells) {
  const cellN = gameMatrix.indexOf(cell);
  return [...filledCells, cellN].sort((a, b) => a - b);
}

// Define two empty RoleSet's for X and O
const xAndOs = turns.map((turn, i) => {
  const set = new RoleSet();
  // Define action for the event when a new element is being
  // added to RoleSet
  setActionOnAddElement(
    set,
    (() => {
      // Keep the record of marked cells in closure
      let filledCells = [];
      return ({ target, roleSet }) => {
        // Reset the record when the first element is added
        if (roleSet.size === 1) {
          filledCells = [];
        }

        // Mark the cell
        target[turn]();

        // Add the cell to the record
        filledCells = keepState(target, filledCells);

        // Check if the state of win exists
        const possibleWin = analyzePossibleWin(filledCells);

        // If analyzePossibleWin returns an array of cells
        // set them the win state
        if (possibleWin) {
          emptyCells.clearElements();
          xAndOs.clearElements();
          possibleWin.forEach((n) => {
            gameMatrix[n].markAsWin();
          });

          // Post the message saying who wins
          postTextMessage(winMessages[i]);

          // otherwise check if all cells are marked
        } else if (emptyCells.size === 0) {
          // Clear elements from the both sets and post the
          // message that the game is over
          xAndOs.clearElements();
          postTextMessage(gameOverMessage);
        }
      };
    })(),
  );

  // Define the action for the event of 'click' type
  eventChain({
    roleSet: set,
    type: 'click',
    action() {
      // Post the message that the cell is occupied
      postTextMessage(cellMarkedMessage);
    },
  });

  return set;
});

// Add the method that clear both (X and O) RoleSets
xAndOs.clearElements = function () {
  this.forEach(set => set.clearElements());
};

// Define the function that sets the state of a cell and
// returns the next turn (for X or O)
function setCell(currentTurn, cell) {
  xAndOs[currentTurn].addElement(cell);
  return 1 - currentTurn;
}

// Define the action for the event of 'click' type
eventChain({
  roleSet: emptyCells,
  type: 'click',
  action: ((firstTurn) => {
    // Store the current turn in closure
    let currentTurn = firstTurn;
    return ({ target, roleSet }) => {
      // Check if the game has just begun and reset the
      // first turn
      if (roleSet.size === 9) {
        currentTurn = firstTurn;
      }
      currentTurn = setCell(currentTurn, target);
    };
  })(0),
});

// Define the action that restarts the game
restartButton.onclick = () => {
  // Reset all cells
  gameMatrix.forEach(cell => cell.resetCell());

  // and add them to the initial RoleSet
  emptyCells.addElements(gameMatrix);
};
```
