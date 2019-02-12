/* eslint-env browser */
import stage from '../../../../stage/stage';
import { timeDisplayParams } from './timeDisplay_params';
import { Actor, ActorsSet } from '../../../../libs/actors_and_roles';
import { setA } from '../../supersets/setA';
import './styles.css';
import { startStopRoles } from '../../../../roles_manipulators';
import { resultOfGame } from '../resultOfGame/resultOfGame';
import { gameResultsTypes } from '../resultOfGame/resultOfGame_params';
import { onPulseTick } from '../../../../stage/role_classes';
import bigArrowImg from './img/big_arrow.png';
import smallArrowImg from './img/small_arrow.png';
import { imagesDataURL, getDataURL } from '../../../../libs/session_storage_lib';
import { setImg } from '../../../../libs/helpers_lib';

imagesDataURL.addElements([bigArrowImg, smallArrowImg]);

const timeCircle = new Actor('div', timeDisplayParams.timeCircle.position, {
  scaleF: stage.scaleF,
  zIndex: 50,
}).attachClassName('timeCircle');

const centerPoint = new Actor('div', timeDisplayParams.centerPoint.position, {
  scaleF: stage.scaleF,
  zIndex: 50,
})
  .attachClassName('centerPoint')
  .getAppendedAsChild(timeCircle);

timeCircle.linkActor(centerPoint);

const bigArrow = new Actor('div', timeDisplayParams.bigArrow.position, {
  scaleF: stage.scaleF,
  zIndex: 50,
})
  .attachClassName('bigArrow')
  .getAppendedAsChild(timeCircle);

timeCircle.linkActor(bigArrow);

const smallArrow = new Actor('div', timeDisplayParams.bigArrow.position, {
  scaleF: stage.scaleF,
  zIndex: 50,
})
  .attachClassName('smallArrow')
  .getAppendedAsChild(timeCircle);

timeCircle.linkActor(smallArrow);

function rotateArrow({ node: arrow }, angle) {
  arrow.style.transform = `rotate(${angle}deg)`;
  arrow.style['transform-origin'] = 'bottom center';
}

function paintSector({ node: circle }, angle) {
  let backgroundImageProp;
  if (angle === 0) {
    backgroundImageProp = 'none';
  } else {
    if (angle < 180) {
      backgroundImageProp = `linear-gradient(${90
        + angle}deg, transparent 50%, var(--alert-color) 50%),\n`;
    } else {
      backgroundImageProp = `linear-gradient(${angle
        - 90}deg, transparent 50%, var(--background-color) 50%),\n `;
    }
    backgroundImageProp += 'linear-gradient(90deg, var(--alert-color) 50%, transparent 50%)';
  }
  circle.style['background-image'] = backgroundImageProp;
}

// eslint-disable-next-line
export const timeDisplay = new ActorsSet();

const moduleState = {};

timeDisplay.getInitializer(function () {
  setImg(bigArrow, getDataURL(bigArrowImg));
  setImg(smallArrow, getDataURL(smallArrowImg));
  this.addElement(timeCircle);
  timeCircle.getAppendedAsChild(stage);
  moduleState.startTime = performance.now();
  const { remainingTime } = stage.params.levelParams;
  const { maxRemainingTime } = timeDisplayParams;
  const bigAngle = 360 * (1 - remainingTime / maxRemainingTime);
  const smallAngle = 330 + bigAngle / 12;
  Object.assign(moduleState, { bigAngle, smallAngle });
  rotateArrow(bigArrow, bigAngle);
  rotateArrow(smallArrow, smallAngle);
  paintSector(timeCircle, bigAngle);
});

timeDisplay.name = 'timeDisplay';

function adjustAngle(angle, ratio) {
  return 360 - ratio * (360 - angle);
}

export const timeMovesRole = onPulseTick.registerAction(timeDisplay, {
  action() {
    const { startTime } = moduleState;
    const lifeTime = (performance.now() - startTime) / 1000;
    stage.state.lifeTime = lifeTime;
    const { remainingTime } = stage.params.levelParams;
    if (lifeTime < remainingTime) {
      const { bigAngle, smallAngle } = moduleState;
      const ratio = 1 - lifeTime / remainingTime;
      const adjustedBigAngle = adjustAngle(bigAngle, ratio);
      rotateArrow(bigArrow, adjustedBigAngle);
      rotateArrow(smallArrow, adjustAngle(smallAngle, ratio));
      paintSector(timeCircle, adjustedBigAngle);
    } else {
      resultOfGame.getResult(gameResultsTypes.LOST);
    }
  },
});

startStopRoles.addElement(timeMovesRole);
setA.addElement(timeDisplay);
