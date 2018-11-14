/* eslint-env browser */
import { ActorsSet, Actor, registerActionOfType } from '../libs/actors_and_roles';
import { startStopLevel } from '../roles_manipulators';
import { setA } from '../screens/gameplay/supersets/setA';

const button = new Actor(document.createElement('button'), { width: 100, height: 50 });
document.querySelector('body').appendChild(button.node);
button.node.style.margin = '10px';
button.node.innerText = 'stop';

const stopButton = new ActorsSet([button]);

registerActionOfType('click', stopButton, {
  action() {
    startStopLevel.stop();
    setA.getCleaner().fire();
  },
}).start();
