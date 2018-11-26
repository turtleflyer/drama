/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';
import { beerTypes, mugsParams } from '../../assets/gameplay_params';
import Mug from '../../actor_classes/Mug/Mug';
import { stageDimension } from '../../../../assets/common_params';
import stage from '../../../../role_sets/stage/stage';

// eslint-disable-next-line
export const mugsOnLine = new ActorsSet();

mugsOnLine.name = 'mugsOnLine';

mugsOnLine.determineTypeOfBeer = function () {
  return beerTypes.IPA;
};

const { mugsSpeed, initMugDensity } = stage.params.levelParams;
const { width: stageWidth } = stageDimension;

mugsOnLine.newBornTime = function (mug) {
  if (stage.state.reputation < 0) {
    return Infinity;
  }
  // prettier-ignore
  const delay = (stageWidth * 0.6) / (initMugDensity * stage.state.reputation) / (mugsSpeed / 1000)
    || Infinity;
  return mug.params.bornTime + delay;
};

mugsOnLine.getInitializer(function () {
  const mug = new Mug(this.determineTypeOfBeer(), stageWidth + 1000);
  mug.params.bornTime = performance.now() + mugsParams.initialDelay * 1000;
  this.addElements([mug]);
  this.state = {
    timeOfNextBirth: this.newBornTime(mug),
  };
});
