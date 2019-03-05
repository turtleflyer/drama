/* eslint-env browser */
import { ActorsSet } from '../../libs/actors_and_roles';
import stage from '../../stage/stage';
import { fillingMugs } from '../../screens/gameplay/role_sets/fillingMugs/fillingMugs';
import { setD, updateDebugInfo } from './setD';

const filteredKeysToDisplay = ['reputation', 'drunkFactor', 'lifeTime', 'remainingTime'];
const precise = 1;

const displayInfo = document.createElement('div');

export default displayInfo;

const infoSet = new ActorsSet([displayInfo]);
infoSet.name = 'infoSet';
setD.addElement(infoSet);

updateDebugInfo
  .registerAction(infoSet, {
    action() {
      const textToDisplay = `stage.state: ${JSON.stringify(
        Object.entries({
          ...stage.state,
          remainingTime: stage.params.levelParams.remainingTime,
        }).reduce((obj, [k, v]) => {
          if (filteredKeysToDisplay.includes(k)) {
            return { ...obj, [k]: v };
          }
          return { ...obj };
        }, {}),
        (_, value) => {
          if (typeof value === 'number') {
            // prettier-ignore
            return (Math.round(value * (10 ** precise)) / (10 ** precise)).toFixed(precise);
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
