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
import { fallenMug } from '../../fallenMug/fallenMug';
import { fillingGlass } from '../../fillingGlass/fillingGlass';
import { pouringMug } from '../../pouringMug/pouringMug';
import { startStopRoles } from '../../../../../roles_manipulators';
import mugTypesGenerator from './mugTypesGenerator';

export const mugsOnLine = new ActorsSet();

mugsOnLine.name = 'mugsOnLine';

const { width: stageWidth } = stageDimension;
let lastMug;
let timeOfNextBirth;
let lastReputationValue;
let determineTypeOfBeer;

function refreshTimeOfNextBirth() {
  if (stage.state.reputation < 0) {
    timeOfNextBirth = Infinity;
  } else {
    // prettier-ignore
    const delay = (stageWidth * 0.6) / (mugsOnLine.params.initMugDensity * stage.state.reputation)
      / (mugsOnLine.params.mugsSpeed / 1000);
    timeOfNextBirth = delay ? lastMug.params.bornTime + delay : Infinity;
  }
}

function createNewMug() {
  const typeOfMug = determineTypeOfBeer.next().value;
  if (typeOfMug === glassType) {
    return new WhiskeyGlass(stageWidth + 1000);
  }
  return new Mug(typeOfMug, stageWidth + 1000);
}

mugsOnLine.getInitializer(function () {
  determineTypeOfBeer = mugTypesGenerator();
  const { mugsSpeed, initMugDensity } = stage.params.levelParams;
  Object.assign((this.params = {}), { mugsSpeed, initMugDensity });
  const mug = createNewMug();
  mug.params.bornTime = performance.now() + magsCreatingParams.initialDelay * 1000;
  this.addElements([mug]);
  lastMug = mug;
  lastReputationValue = null;
});

export const generateMugsRole = onPulseTick.registerAction(mugsOnLine, {
  action({ target: mug, event }) {
    if (event && event.beenOnPause) {
      mug.params.bornTime += event.beenOnPause;
      if (mug === [...mugsOnLine][0]) {
        timeOfNextBirth += event.beenOnPause;
      }
    }

    const currTime = performance.now();

    if (lastReputationValue !== stage.state.reputation) {
      refreshTimeOfNextBirth();
      lastReputationValue = stage.state.reputation;
    }

    if (mugsOnLine.size > 0) {
      const {
        params: { bornTime },
      } = mug;

      // eslint-disable-next-line
      const calculatedPosition =
        stageWidth - (currTime - bornTime) * (mugsOnLine.params.mugsSpeed / 1000);

      // Check if the mug disappeared from the stage
      if (calculatedPosition < -(mug.position.width / 2)) {
        mugsOnLine.deleteElement(mug);
        mug.remove();
        stage.state.reputation += tuneGame.reputationDecrement;
      } else {
        mug.setPositionXY({ x: calculatedPosition });
      }
    } else if (
      dragMug.size === 0
      && waitingMugs.size === 0
      && fillingMugs.size === 0
      && fillingGlass.size === 0
      && fallenMug.size === 0
      && pouringMug.size === 0
      && timeOfNextBirth
      && timeOfNextBirth - currTime > magsCreatingParams.maxDelayToGenerateNext * 1000
    ) {
      timeOfNextBirth = null;
      resultOfGame.getResult(gameResultsTypes.LOST);
    }

    if (timeOfNextBirth && timeOfNextBirth - 1000 < currTime) {
      const generatedMug = createNewMug();
      generatedMug.params.bornTime = timeOfNextBirth;
      lastMug = generatedMug;
      mugsOnLine.addElement(generatedMug);
      refreshTimeOfNextBirth();
    }
  },
});

startStopRoles.addElement(generateMugsRole);
