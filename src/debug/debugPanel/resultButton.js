/* eslint-env browser */
import { resultOfGame } from '../../screens/gameplay/role_sets/resultOfGame/resultOfGame';
import { gameResultsTypes } from '../../screens/gameplay/role_sets/resultOfGame/resultOfGame_params';

const resultButton = document.createElement('button');
Object.assign(resultButton.style, { width: '100px', height: '20px', margin: '5px' });
resultButton.innerText = 'get result';

let index = 0;
resultButton.addEventListener('click', () => {
  if ([...resultOfGame][0]) {
    [...resultOfGame][0].remove();
    resultOfGame.clearElements();
  }
  resultOfGame.getResult(gameResultsTypes[Object.keys(gameResultsTypes)[index]]);
  index = 1 - index;
});

export default resultButton;
