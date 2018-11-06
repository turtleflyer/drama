/* eslint-env browser */
import './styles.css';
import './screens/gameplay/role_sets/mugsOnLine/mugsOnLine';
import { setA } from './screens/gameplay/supersets/setA';
import { sendPulseRole } from './role_sets/stage/stage_roles';
import { stage } from './role_sets/stage/stage';
import { startStopLevel, startGame } from './roles_manipulators';

setA.getInitializer().fireAndWaitWhenExhausted()(() => {
  startGame.start();
  startStopLevel.start();
  sendPulseRole.fire();
});

let f = true;
const b = document.createElement('button');
b.style = 'width: 100px; height: 30px';
b.addEventListener('mousedown', () => {
  if (f) {
    startStopLevel.stop();
    setA.getCleaner().fire();
  } else {
    stage.defineLevel(1);
    setA.getInitializer().fireAndWaitWhenExhausted()(() => {
      startStopLevel.start();
    });
  }
  f = !f;
});
document.querySelector('body').appendChild(b);
