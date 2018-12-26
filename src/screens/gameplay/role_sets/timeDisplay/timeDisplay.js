/* eslint-env browser */
import { Actor, ActorsSet } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { setImg, updateStyle } from '../../../../libs/helpers_lib';
import dayAndNightImg from './img/day_and_night.png';
import { onPulseTick } from '../../../../stage/role_classes';
import './styles.css';
import { timeDisplayParams, rotationAngleOfDayAndNight } from './timeDisplay_params';
import { gameResultsTypes } from '../resultOfGame/resultOfGame_params';
import { resultOfGame } from '../resultOfGame/resultOfGame';
import { getDataURL, imagesDataURL } from '../../../../libs/session_storage_lib';

imagesDataURL.addElement(dayAndNightImg);

const timeBox = new Actor('div', timeDisplayParams.position, {
  scaleF: stage.scaleF,
  zIndex: 50,
}).attachClassName('timeBox--wrapper');

const dayAndNight = new Actor('div', timeDisplayParams.dayAndNightPosition, {
  scaleF: stage.scaleF,
  zIndex: 55,
});

timeBox.linkActor(dayAndNight);

const timeProgressBar = new Actor('div', timeDisplayParams.progressBarPosition, {
  scaleF: stage.scaleF,
  zIndex: 58,
})
  .attachClassName('timeBox--progress-bar')
  .getAppendedAsChild(timeBox);
timeBox.linkActor(timeProgressBar);

// eslint-disable-next-line
export const timeDisplay = new ActorsSet();

let startTime;

timeDisplay.getInitializer(function () {
  this.addElement(timeBox);
  setImg(dayAndNight, getDataURL(dayAndNightImg), {
    height: '100%',
    display: 'block',
    position: 'static',
    margin: 'auto',
  }).getAppendedAsChild(timeBox);
  timeBox.getAppendedAsChild(stage);
  startTime = performance.now();
});

timeDisplay.name = 'timeDisplay';

export const rotateDayAndNightRole = onPulseTick.registerAction(timeDisplay, {
  action() {
    const lifeTime = (performance.now() - startTime) / 1000;
    const { remainingTime } = stage.params.levelParams;
    if (lifeTime < remainingTime) {
      const angleToRotate = (lifeTime / remainingTime) * rotationAngleOfDayAndNight;
      updateStyle(dayAndNight.node, { transform: `rotate(${angleToRotate}deg)` });
      // prettier-ignore
      const progressBarLength = (1 - lifeTime / remainingTime)
        * timeDisplayParams.progressBarPosition.width;
      timeProgressBar.setPosition({ width: progressBarLength });
    } else {
      resultOfGame.getResult(gameResultsTypes.LOST);
    }
  },
});
