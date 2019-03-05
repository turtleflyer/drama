/* eslint-env browser */
import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import './styles.css';
import { gameResultsParams, gameResultsTypes } from './resultOfGame_params';
import { startLevel } from '../../../../stage/level_starter';
import { setA } from '../../supersets/setA';
import debugFlags from '../../../../debug/debug_flags';

class GameResult extends Actor {
  constructor() {
    super('div', gameResultsParams.position, { scaleF: stage.scaleF, zIndex: 100 });
    this.node.classList.add('gameResult');
    this.button = new Actor('div', gameResultsParams.button.position, {
      scaleF: stage.scaleF,
      zIndex: 120,
    }).getAppendedAsChild(this);
    this.linkActor(this.button);
    this.button.node.classList.add('gameResult--button');
    this.button.node.addEventListener('click', () => {
      this.button.node.classList.add('gameResult--button--pushed');
      window.setTimeout(this.onClick.bind(this), 1000);
    });
  }
}

class WinResult extends GameResult {
  constructor() {
    super();
    this.node.classList.add('gameResult--won');
    this.node.insertAdjacentHTML('afterbegin', '<p>Level completed</p>');
    this.getAppendedAsChild(stage);
    this.button.node.innerText = 'Press to continue';
  }

  // eslint-disable-next-line
  onClick() {
    startLevel(debugFlags.CUSTOM_LEVEL_RUNNING ? stage.state.level : stage.state.level + 1);
  }
}

class LoseResult extends GameResult {
  constructor() {
    super();
    this.node.classList.add('gameResult--lost');
    this.node.insertAdjacentHTML('afterbegin', '<p>You failed</p>');
    this.getAppendedAsChild(stage);
    this.button.node.innerText = 'Try again';
  }

  // eslint-disable-next-line
  onClick() {
    startLevel(stage.state.level);
  }
}

// eslint-disable-next-line
export const resultOfGame = new ActorsSet();

resultOfGame.name = 'resultOfGame';

resultOfGame.getResult = function (result) {
  if (this.size === 0) {
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
  }
};

setA.addElement(resultOfGame);
