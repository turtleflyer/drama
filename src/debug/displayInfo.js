/* eslint-env browser */
import { ActorsSet } from '../libs/actors_and_roles';
import stage from '../stage/stage';
import { fillingMugs } from '../screens/gameplay/role_sets/fillingMugs/fillingMugs';
import { setD, updateDebugInfo } from './setD';

export const displayInfo = document.createElement('div');

export const infoSet = new ActorsSet([displayInfo]);
infoSet.name = 'infoSet';
setD.addElement(infoSet);

updateDebugInfo
  .registerAction(infoSet, {
    action() {
      const textToDisplay = `stage.state: ${JSON.stringify(stage.state)}
      [...fillingMugs][0]: ${JSON.stringify(
    [...fillingMugs][0]
          && Object.assign([...fillingMugs][0].state.beers, {
            beerType: [...fillingMugs][0].beerType,
          }),
  )}`;
      displayInfo.innerText = textToDisplay;
    },
  })
  .start();
