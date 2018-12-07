/* eslint-env browser */
import { ActorsSet } from '../../../../../libs/actors_and_roles';
import Mug from '../MugClass';
import { stageDimension } from '../../../../../assets/common_params';
import stage from '../../../../../role_sets/stage/stage';
import { onPulseTick } from '../../../../../assets/role_classes';
import { getResultRole } from '../../resultOfGame/resultOfGame';
import { dragMug } from '../../dragMug/dragMug';
import { beerTypes, tuneGame } from '../../../../../role_sets/stage/gameplay_params';
import { gameResultsTypes } from '../../resultOfGame/resultOfGame_params';
import { fillingMugs } from '../../fillingMugs/fillingMugs';
import { mugsParams } from '../mugs_params';
import { waitingMugs } from '../../waitingMugs/waitingMugs';

export const mugsOnLine = new ActorsSet();

mugsOnLine.name = 'mugsOnLine';

const { width: stageWidth } = stageDimension;
let lastMug;
let timeOfNextBirth;
let lastReputationValue = stage.state.reputation;

function determineTypeOfBeer() {
  return beerTypes.IPA;
}

function refreshTimeOfNextBirth(takeThis) {
  if (stage.state.reputation < 0) {
    timeOfNextBirth = Infinity;
  } else {
    // prettier-ignore
    const delay = (stageWidth * 0.6) / (takeThis.params.initMugDensity * stage.state.reputation)
    / (takeThis.params.mugsSpeed / 1000);
    timeOfNextBirth = delay ? lastMug.params.bornTime + delay : Infinity;
  }
}

mugsOnLine.getInitializer(function () {
  const { mugsSpeed, initMugDensity } = stage.params.levelParams;
  Object.assign((this.params = {}), { mugsSpeed, initMugDensity });
  const mug = new Mug(determineTypeOfBeer(), stageWidth + 1000);
  mug.params.bornTime = performance.now() + mugsParams.initialDelay * 1000;
  this.addElements([mug]);
  lastMug = mug;
  refreshTimeOfNextBirth(this);
});

export const generateMugsRole = onPulseTick.registerAction(mugsOnLine, {
  action({ target: mug }) {
    const currTime = performance.now();

    if (lastReputationValue !== stage.state.reputation) {
      refreshTimeOfNextBirth(this.roleSet);
      lastReputationValue = stage.state.reputation;
    }

    if (this.roleSet.size > 0) {
      const {
        params: { bornTime },
      } = mug;

      // eslint-disable-next-line
      const calculatedPosition =
        stageWidth - (currTime - bornTime) * (this.roleSet.params.mugsSpeed / 1000);

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

    if (timeOfNextBirth && timeOfNextBirth - 200 < currTime) {
      const generatedMug = new Mug(determineTypeOfBeer(), stageWidth + 1000);
      generatedMug.params.bornTime = timeOfNextBirth;
      lastMug = generatedMug;
      this.roleSet.addElement(generatedMug);
      refreshTimeOfNextBirth(this.roleSet);

      /**
       *
       * Block to debug
       *
       */
      // const generatedMugs = [];
      // for (let i = 0; i < 1; i++) {
      //   const gen = new Mug(determineTypeOfBeer(), stageWidth + 1000);
      //   generatedMugs.push(gen);
      //   gen.params.bornTime = timeOfNextBirth;
      //   lastMug = gen;
      // }
      // this.roleSet.addElements(generatedMugs);
      // refreshTimeOfNextBirth(this.roleSet);
    }
  },
});
