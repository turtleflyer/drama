/* eslint-env browser */
import './styles.css';
import './screens/gameplay/role_sets/mugsOnLine/mugsOnLine';
import startStopLevel from './screens/gameplay/roles_manipulators/start_stop_level';
import setA from './screens/gameplay/supersets/setA';
import { sendPulse } from './role_sets/stage/stage_roles';
import stage from './role_sets/stage/stage';

setA.getInitializer().fireAndWaitWhenExhausted()(() => {
  startStopLevel.start();
});

sendPulse.start().fire();

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
