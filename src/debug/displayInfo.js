/* eslint-env browser */
import { ActorsSet } from '../libs/actors_and_roles';
import stage from '../stage/stage';
import { fillingMugs } from '../screens/gameplay/role_sets/fillingMugs/fillingMugs';
import { setD, updateDebugInfo } from './setD';

const displayInfo = document.createElement('div');

export default displayInfo;

const infoSet = new ActorsSet([displayInfo]);
infoSet.name = 'infoSet';
setD.addElement(infoSet);

updateDebugInfo
  .registerAction(infoSet, {
    action() {
      const textToDisplay = `stage.state: ${JSON.stringify(
        {
          ...stage.state,
          remainingTime: stage.params.levelParams.remainingTime,
        },
        (_, value) => {
          if (typeof value === 'number') {
            return Math.round(value * 1000) / 1000;
          }
          return value;
        },
      )}
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
