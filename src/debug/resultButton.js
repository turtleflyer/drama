/* eslint-env browser */
import { ActorsSet, Actor, registerActionOfType } from '../libs/actors_and_roles';
import { resultOfGame } from '../screens/gameplay/role_sets/resultOfGame/resultOfGame';
import { gameResultsTypes } from '../screens/gameplay/role_sets/resultOfGame/resultOfGame_params';

const button = new Actor('button', { width: 100, height: 50 });
document.querySelector('body').appendChild(button.node);
button.node.style.margin = '10px';
button.node.innerText = 'get result';

const totalButton = new ActorsSet([button]);

let index = 0;

registerActionOfType('click', totalButton, {
  action() {
    if ([...resultOfGame][0]) {
      [...resultOfGame][0].remove();
      resultOfGame.clearElements();
    }
    resultOfGame.getResult(gameResultsTypes[Object.keys(gameResultsTypes)[index]]);
    index = 1 - index;
  },
}).start();
