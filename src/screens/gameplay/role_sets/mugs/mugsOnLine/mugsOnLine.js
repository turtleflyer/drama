/* eslint-env browser */
import { ActorsSet } from '../../../../../libs/actors_and_roles';
import Mug from '../MugClass';
import stage from '../../../../../stage/stage';
import { onPulseTick } from '../../../../../stage/role_classes';
import { dragMug } from '../../dragMug/dragMug';
import { tuneGame, stageDimension, glassType } from '../../../../../stage/gameplay_params';
import { gameResultsTypes } from '../../resultOfGame/resultOfGame_params';
import { fillingMugs } from '../../fillingMugs/fillingMugs';
import { waitingMugs } from '../../waitingMugs/waitingMugs';
import { magsCreatingParams } from '../mugs_params';
import { resultOfGame } from '../../resultOfGame/resultOfGame';
import WhiskeyGlass from '../WhiskeyGlassClass';

export const mugsOnLine = new ActorsSet();

mugsOnLine.name = 'mugsOnLine';

const { width: stageWidth } = stageDimension;
let lastMug;
let timeOfNextBirth;
let lastReputationValue = stage.state.reputation;
let queueOfMugTypes;
let lastCreatedType;

function determineTypeOfBeer() {
  const {
    params: {
      levelParams: { mugsDistribution },
    },
  } = stage;

  if (Object.keys(mugsDistribution).length === 1) {
    return Object.keys(mugsDistribution)[0];
  }

  const tempPlace = [];
  let getType;

  function probeGetType(type) {
    const { type: lastType, count: lastCount } = lastCreatedType;
    if (!lastCount || lastCount < 2 || lastType !== type) {
      getType = type;
      Object.assign(lastCreatedType, { type, count: lastType === type ? lastCount + 1 : 1 });
      return true;
    }
    return false;
  }

  while (queueOfMugTypes.length > 0) {
    const nextFromQueue = queueOfMugTypes.shift();
    if (probeGetType(nextFromQueue)) {
      break;
    } else {
      tempPlace.push(nextFromQueue);
    }
  }
  queueOfMugTypes.splice(0, 0, ...tempPlace);

  if (!getType) {
    while (true) {
      const random = Math.random();
      let randomType;
      for (const key in mugsDistribution) {
        if (Object.prototype.hasOwnProperty.call(mugsDistribution, key)) {
          const threshold = mugsDistribution[key];
          if (random <= threshold) {
            randomType = key;
            break;
          }
        }
      }
      if (probeGetType(randomType)) {
        break;
      } else {
        queueOfMugTypes.push(randomType);
      }
    }
  }

  return getType;
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

function createNewMug() {
  const typeOfMug = determineTypeOfBeer();
  if (typeOfMug === glassType) {
    return new WhiskeyGlass(stageWidth + 1000);
  }
  return new Mug(typeOfMug, stageWidth + 1000);
}

mugsOnLine.getInitializer(function () {
  queueOfMugTypes = [];
  lastCreatedType = {};
  const { mugsSpeed, initMugDensity } = stage.params.levelParams;
  Object.assign((this.params = {}), { mugsSpeed, initMugDensity });
  const mug = createNewMug();
  mug.params.bornTime = performance.now() + magsCreatingParams.initialDelay * 1000;
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
        mug.setPositionXY({ x: calculatedPosition });
      }
    } else if (
      dragMug.size === 0
      && waitingMugs.size === 0
      && fillingMugs.size === 0
      && timeOfNextBirth
      && timeOfNextBirth - currTime > magsCreatingParams.maxDelayToGenerateNext * 1000
    ) {
      timeOfNextBirth = null;
      resultOfGame.getResult(gameResultsTypes.LOST);
    }

    if (timeOfNextBirth && timeOfNextBirth - 200 < currTime) {
      const generatedMug = createNewMug();
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
