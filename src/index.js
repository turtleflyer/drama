/* eslint-env browser */
import './styles.css';
import './role_sets/stage/stage';
import './screens/gameplay/role_sets/mugsOnLine/mugsOnLine';
import sendPulse from './role_sets/stage/roles/sendPulse';
import startStopLevel from './screens/gameplay/roles_manipulators/start_stop_level';
import { setACleaner, setAInitializer } from './screens/gameplay/supersets/setA/setA';
import { debugSymbols } from './actors_and_roles';

setAInitializer.fireAndWaitWhenExhausted()(() => {
  startStopLevel.start();
});
sendPulse.start();
sendPulse.fire();

let f = true;
const b = document.createElement('button');
b.style = 'width: 100px; height: 30px';
b.addEventListener('mousedown', () => {
  if (f) {
    startStopLevel.stop();
    setACleaner.fire();
  } else {
    setAInitializer.fireAndWaitWhenExhausted()(() => {
      console.log('here');
      startStopLevel.start();
      debugSymbols.pushed = true;
    });
  }
  f = !f;
});
document.querySelector('body').appendChild(b);
