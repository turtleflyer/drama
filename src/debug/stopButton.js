/* eslint-env browser */
import { ActorsSet, Actor, registerActionOfType } from '../libs/actors_and_roles';
import { startStopRoles } from '../roles_manipulators';
import { setA } from '../screens/gameplay/supersets/setA';

const button = new Actor('button', { width: 100, height: 50 });
document.querySelector('body').appendChild(button.node);
button.node.style.margin = '10px';
button.node.innerText = 'stop';

const stopButton = new ActorsSet([button]);

registerActionOfType('click', stopButton, {
  action() {
    startStopRoles.stop();
    setA.getCleaner().fire();
  },
}).start();
