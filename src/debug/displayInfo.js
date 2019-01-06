/* eslint-env browser */
import { ActorsSet } from '../libs/actors_and_roles';
import stage from '../stage/stage';
import { onPulseTick } from '../stage/role_classes';
import { fillingMugs } from '../screens/gameplay/role_sets/fillingMugs/fillingMugs';

const info = document.createElement('div');
document.querySelector('body').appendChild(info);

const infoSet = new ActorsSet([info]);

export default infoSet;

onPulseTick
  .registerAction(infoSet, {
    action() {
      const textToDisplay = `stage.state: ${JSON.stringify(stage.state)}
      [...fillingMugs][0]: ${JSON.stringify(
    [...fillingMugs][0]
          && Object.assign([...fillingMugs][0].state.beers, {
            beerType: [...fillingMugs][0].beerType,
          }),
  )}`;
      info.innerText = textToDisplay;
    },
  })
  .start();
