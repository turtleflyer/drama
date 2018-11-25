/* eslint-env browser */
import { Actor, ActorsSet } from '../../../../libs/actors_and_roles';
import { timeDisplayParams, rotationAngleOfDayAndNight } from '../../assets/gameplay_params';
import stage from '../../../../role_sets/stage/stage';
import { setImg, updateStyle } from '../../../../libs/helpers_lib';
import dayAndNightImg from './img/day_and_night.png';
import { onPulseTick } from '../../../../assets/role_classes';

const timeBox = new Actor(document.createElement('div'), timeDisplayParams.position, stage.scaleF);
timeBox.attachClassName('timeBox--wrapper');
const dayAndNight = new Actor(
  document.createElement('div'),
  timeDisplayParams.dayAndNightPosition,
  stage.scaleF,
);
setImg(dayAndNight, dayAndNightImg, {
  height: '100%',
  display: 'block',
  position: 'static',
  margin: 'auto',
}).getAppendedAsChild(timeBox);
timeBox.linkActor(dayAndNight);

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
    }
  },
});
