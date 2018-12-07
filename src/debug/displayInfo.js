/* eslint-env browser */
import { ActorsSet } from '../libs/actors_and_roles';
import stage from '../stage/stage';
import { onPulseTick } from '../stage/role_classes';

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
