/* eslint-env browser */
import { Actor, ActorsSet } from '../../../../libs/actors_and_roles';
import stage from '../../../../role_sets/stage/stage';
import { setImg, updateStyle } from '../../../../libs/helpers_lib';
import dayAndNightImg from './img/day_and_night.png';
import { onPulseTick } from '../../../../assets/role_classes';
import './styles.css';
import { getResultRole } from '../resultOfGame/resultOfGame';
import { timeDisplayParams, rotationAngleOfDayAndNight } from './timeDisplay_params';
import { gameResultsTypes } from '../resultOfGame/resultOfGame_params';

const timeBox = new Actor('div', timeDisplayParams.position, {
  scaleF: stage.scaleF,
  zIndex: 50,
}).attachClassName('timeBox--wrapper');

const dayAndNight = new Actor('div', timeDisplayParams.dayAndNightPosition, {
  scaleF: stage.scaleF,
});

setImg(dayAndNight, dayAndNightImg, {
  height: '100%',
  display: 'block',
  position: 'static',
  margin: 'auto',
}).getAppendedAsChild(timeBox);
timeBox.linkActor(dayAndNight);

const timeProgressBar = new Actor('div', timeDisplayParams.progressBarPosition, {
  scaleF: stage.scaleF,
})
  .attachClassName('timeBox--progress-bar')
  .getAppendedAsChild(timeBox);
timeBox.linkActor(timeProgressBar);

// eslint-disable-next-line
export const timeDisplay = new ActorsSet();

let startTime;

timeDisplay.getInitializer(function () {
  this.addElement(timeBox);
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
      getResultRole.fire({ result: gameResultsTypes.LOST });
    }
  },
});
