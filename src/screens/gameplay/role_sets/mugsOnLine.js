/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import { beerTypes, mugsParams, tuneGame } from '../assets/gameplay_params';
import Mug from '../actor_classes/Mug/Mug';
import { stageDimension } from '../../../assets/common_params';
import stage from '../../../role_sets/stage/stage';
import { onPulseTick } from '../../../assets/role_classes';

export const mugsOnLine = new ActorsSet();

mugsOnLine.name = 'mugsOnLine';

function determineTypeOfBeer() {
  return beerTypes.IPA;
}

const { mugsSpeed, initMugDensity } = stage.params.levelParams;
const { width: stageWidth } = stageDimension;

function newBornTime(mug) {
  if (stage.state.reputation < 0) {
    return Infinity;
  }
  // prettier-ignore
  const delay = (stageWidth * 0.6) / (initMugDensity * stage.state.reputation) / (mugsSpeed / 1000)
    || Infinity;
  return mug.params.bornTime + delay;
}

mugsOnLine.getInitializer(function () {
  const mug = new Mug(determineTypeOfBeer(), stageWidth + 1000);
  mug.params.bornTime = performance.now() + mugsParams.initialDelay * 1000;
  this.addElements([mug]);
  this.state = {
    timeOfNextBirth: newBornTime(mug),
  };
});

export const generateMugsRole = onPulseTick.registerAction(mugsOnLine, {
  action({ target: mug }) {
    const currTime = performance.now();
    const { state } = this.roleSet;

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
      state.timeOfNextBirth
      && state.timeOfNextBirth - currTime > mugsParams.maxDelayToGenerateNext * 1000
    ) {
      state.timeOfNextBirth = null;
    }

    if (
      state.timeOfNextBirth
      && state.timeOfNextBirth - mugsParams.initialDelay * 1000 < currTime
    ) {
      const generatedMug = new Mug(determineTypeOfBeer(), stageWidth + 1000);
      generatedMug.params.bornTime = state.timeOfNextBirth;
      this.roleSet.addElement(generatedMug);
      state.timeOfNextBirth = newBornTime(generatedMug);
    }
  },
});