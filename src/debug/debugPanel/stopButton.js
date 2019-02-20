/* eslint-env browser */
import { startStopRoles } from '../../roles_manipulators';
import { setA } from '../../screens/gameplay/supersets/setA';

const stopButton = document.createElement('button');
Object.assign(stopButton.style, { width: '100px', height: '20px', margin: '5px' });
stopButton.innerText = 'stop';
stopButton.addEventListener('click', () => {
  startStopRoles.stop();
  setA.getCleaner().fire();
});

export default stopButton;
