/* eslint-env browser */
import './styles.css';
import './role_sets/stage/stage';
import './screens/gameplay/role_sets/mugsOnLine/mugsOnLine';
import './screens/gameplay/supersets/setA/setA';
import sendPulse from './role_sets/stage/roles/sendPulse';
import startStopLevel from './screens/gameplay/roles_manipulators/start_stop_level';

startStopLevel.start();
sendPulse.start();
sendPulse.fireItself();

let f = true;
const b = document.createElement('button');
b.style = 'width: 100px; height: 30px';
b.addEventListener('mousedown', () => {
  f ? startStopLevel.stop() : startStopLevel.start();
  f = !f;
});
document.querySelector('body').appendChild(b);
