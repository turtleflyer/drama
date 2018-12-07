/* eslint-env browser */
import { ActorsSet, RoleClass, Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../role_sets/stage/stage';
import './styles.css';
import { gameResultsParams, gameResultsTypes } from './resultOfGame_params';

export const resultOfGame = new ActorsSet();

resultOfGame.name = 'resultOfGame';

class GameResult extends Actor {
  constructor() {
    super('div', gameResultsParams.position, { scaleF: stage.scaleF, zIndex: 100 });
    this.node.classList.add('gameResult');
  }
}

class WinResult extends GameResult {
  constructor() {
    super();
    this.node.classList.add('gameResult--won');
    this.node.innerHTML = '<p>You won!!!</p>';
    this.getAppendedAsChild(stage);
  }
}

class LoseResult extends GameResult {
  constructor() {
    super();
    this.node.classList.add('gameResult--lost');
    this.node.innerHTML = '<p>You lost!!!</p>';
    this.getAppendedAsChild(stage);
  }
}

export const getResultRole = new RoleClass(Symbol('getResultRole'))
  .registerAction(resultOfGame, {
    action({ event: { result } }) {
      if (this.roleSet.size === 0) {
        stage.pause();
        let newElement;
        switch (result) {
          case gameResultsTypes.WON:
            newElement = new WinResult();
            break;

          case gameResultsTypes.LOST:
            newElement = new LoseResult();
            break;

          default:
            break;
        }
        resultOfGame.addElement(newElement);
        window.setTimeout(() => {
          resultOfGame.deleteElement(newElement);
          newElement.remove();
        }, 5000);
      }
    },
  })
  .start();
