/* eslint-env browser */
import './styles.css';
import './role_sets/stage/stage';
import './screens/gameplay/role_sets/mugsOnLine/mugsOnLine';
import startStopLevel from './screens/gameplay/roles_manipulators/start_stop_level';
import { setACleaner, setAInitializer } from './screens/gameplay/supersets/setA';
import { sendPulse } from './role_sets/stage/stage_roles';

setAInitializer.fireAndWaitWhenExhausted()(() => {
  startStopLevel.start();
});

sendPulse.start().fire();

let f = true;
const b = document.createElement('button');
b.style = 'width: 100px; height: 30px';
b.addEventListener('mousedown', () => {
  if (f) {
    startStopLevel.stop();
    setACleaner.fire();
  } else {
    setAInitializer.fireAndWaitWhenExhausted()(() => {
      startStopLevel.start();
    });
  }
  f = !f;
});
document.querySelector('body').appendChild(b);
