/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import {
  beerTypes, mugsParams, tuneGame, gameResultsTypes,
} from '../assets/gameplay_params';
import Mug from '../actor_classes/Mug/Mug';
import { stageDimension } from '../../../assets/common_params';
import stage from '../../../role_sets/stage/stage';
import { onPulseTick } from '../../../assets/role_classes';
import { getResultRole } from './resultOfGame/resultOfGame';
import { dragMug } from './dragMug';
import { waitingMugs } from './waitingMugs';
import { fillingMugs } from './fillingMugs';

export const mugsOnLine = new ActorsSet();

mugsOnLine.name = 'mugsOnLine';

function determineTypeOfBeer() {
  return beerTypes.IPA;
}

const { mugsSpeed, initMugDensity } = stage.params.levelParams;
const { width: stageWidth } = stageDimension;
let lastMug;
let timeOfNextBirth;
let lastReputationValue = stage.state.reputation;

function refreshTimeOfNextBirth() {
  if (stage.state.reputation < 0) {
    timeOfNextBirth = Infinity;
  } else {
    // prettier-ignore
    const delay = (stageWidth * 0.6) / (initMugDensity * stage.state.reputation)
      / (mugsSpeed / 1000);
    timeOfNextBirth = delay ? lastMug.params.bornTime + delay : Infinity;
  }
}

mugsOnLine.getInitializer(function () {
  const mug = new Mug(determineTypeOfBeer(), stageWidth + 1000);
  mug.params.bornTime = performance.now() + mugsParams.initialDelay * 1000;
  this.addElements([mug]);
  lastMug = mug;
  refreshTimeOfNextBirth();
});

export const generateMugsRole = onPulseTick.registerAction(mugsOnLine, {
  action({ target: mug }) {
    const currTime = performance.now();

    if (lastReputationValue !== stage.state.reputation) {
      refreshTimeOfNextBirth();
      lastReputationValue = stage.state.reputation;
    }

    if (this.roleSet.size > 0) {
      const {
        params: { bornTime },
      } = mug;

      const calculatedPosition = stageWidth - (currTime - bornTime) * (mugsSpeed / 1000);

      // Check if the mug disappeared from the stage
      if (calculatedPosition < -(mug.position.width / 2)) {
        this.roleSet.deleteElement(mug);
        mug.remove();
        stage.state.reputation += tuneGame.reputationDecrement;
      } else {
        mug.setPosition({ x: calculatedPosition });
      }
    } else if (
      dragMug.size === 0
      && waitingMugs.size === 0
      && fillingMugs.size === 0
      && timeOfNextBirth
      && timeOfNextBirth - currTime > mugsParams.maxDelayToGenerateNext * 1000
    ) {
      timeOfNextBirth = null;
      getResultRole.fire({ result: gameResultsTypes.LOST });
    }

    if (
      timeOfNextBirth
      && timeOfNextBirth - 200 < currTime
    ) {
      const generatedMug = new Mug(determineTypeOfBeer(), stageWidth + 1000);
      generatedMug.params.bornTime = timeOfNextBirth;
      lastMug = generatedMug;
      this.roleSet.addElement(generatedMug);
      refreshTimeOfNextBirth();
    }
  },
});
