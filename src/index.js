/* eslint-env browser */
import './styles.css';
import './role_sets/stage';
import './role_sets/mugsOnLine';
import './supersets/setA';
import stageSendPulse from './roles/stage_sendPulse';
import startStopLevel from './roles_manipulators/start_stop_level';

startStopLevel.start();
stageSendPulse.start();
stageSendPulse.fireItself();

let f = true;
const b = document.createElement('button');
b.style = 'width: 100px; height: 30px';
b.addEventListener('mousedown', () => {
  f ? startStopLevel.stop() : startStopLevel.start();
  f = !f;
});
document.querySelector('body').appendChild(b);
