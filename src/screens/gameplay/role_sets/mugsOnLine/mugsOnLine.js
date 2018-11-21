/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';
import { beerTypes, mugsParams } from '../../assets/gameplay_params';
import Mug from '../../actor_classes/Mug/Mug';
import { stageDimension } from '../../../../assets/common_params';

export const signalElementAmongMugs = Symbol('@@mugsOnLine/signalElementAmongMugs');

export const mugsOnLine = new ActorsSet();
mugsOnLine.name = 'mugsOnLine';

mugsOnLine.determineTypeOfBeer = function () {
  return beerTypes.IPA;
};

mugsOnLine.getInitializer(function () {
  const place = stageDimension.width + mugsParams.initialDelay;
  const mug = new Mug(this.determineTypeOfBeer(), place);
  this.addElements([signalElementAmongMugs, mug]);
  this.state = {
    placeholdersMap: new Map([[mug, place]]),
    lastTime: Date.now(),
  };
});
