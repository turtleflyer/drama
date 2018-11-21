/* eslint-env browser */
import { ActorsSet } from '../libs/actors_and_roles';
import stage from '../role_sets/stage/stage';
import { onPulseTick } from '../assets/role_classes';

const info = document.createElement('div');
document.querySelector('body').appendChild(info);

const infoSet = new ActorsSet([info]);
export default infoSet;

onPulseTick
  .registerAction(infoSet, {
    action() {
      const textToDisplay = `${JSON.stringify(stage.state)}`;
      info.innerText = textToDisplay;
    },
  })
  .start();
