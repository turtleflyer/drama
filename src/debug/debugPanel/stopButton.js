/* eslint-env browser */
import { startStopRoles } from '../../roles_manipulators';
import { setA } from '../../screens/gameplay/supersets/setA';
import '../styles.css';

const stopButton = document.createElement('button');
stopButton.className = 'debug-panel-button';
stopButton.innerText = 'stop';
stopButton.addEventListener('click', () => {
  startStopRoles.stop();
  setA.getCleaner().fire();
});

export default stopButton;
