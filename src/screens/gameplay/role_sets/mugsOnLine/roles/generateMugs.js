/* eslint-env browser */
import onPulseTick from '../../../../../role_classes/onPulseTick';
import { mugsOnLine, signalElementAmongMugs } from '../mugsOnLine';
import {
  stageDimension, tuneGame, beerTypes, mugsParams,
} from '../../../../../common_params';
import stage from '../../../../../role_sets/stage/stage';
import Mug from '../../../../../actor_classes/Mug';

function determineTypeOfBeer() {
  return beerTypes.BEER_IPA;
}

const { width: stageWidth } = stageDimension;

export default onPulseTick.registerAction(mugsOnLine, {
  action({ target }) {
    const currTime = Date.now();
    const { memory } = this;
    const { mugsSpeed, initMugDensity, reputation } = stage;
    const { placeholdersMap, lastTime } = memory;

    // determine if to calculate placeholders shift
    if (target === signalElementAmongMugs) {
      [...placeholdersMap.entries()].forEach(([mug, place]) => {
        placeholdersMap.set(mug, place + ((currTime - lastTime) * mugsSpeed) / 1000);
      });
      memory.lastTime = currTime;
      // check if the last mug is gone
    } else if (placeholdersMap.size > 0) {
      const newPlace = placeholdersMap.get(target);
      target.setPosition({ x: newPlace });
      const { width } = target;
      // check if the mug disappeared from the stage
      if (newPlace < -(width / 2)) {
        placeholdersMap.delete(target);
        this.roleSet.delete(target);
        target.remove();
        stage.reputation += tuneGame.reputationDecrement;
        if (this.roleSet.size === 2) {
          placeholdersMap.clear();
        }
      }
      if (target.hidden) {
        // check if the hidden mug is appearing on the stage
        if (newPlace < stageWidth + width / 2) {
          target.hidden = false;
          const mugDensity = initMugDensity * (reputation / 100);
          const createdPlace = newPlace + (stageWidth * 0.6) / (mugDensity - 1);
          const createdMug = new Mug(stage, determineTypeOfBeer(), createdPlace);
          createdMug.hidden = true;
          placeholdersMap.set(createdMug, createdPlace);
          this.roleSet.addElement(createdMug);
        }
      }
    }
  },
  initMemoryState: {
    placeholdersMap: (function () {
      const place = stageWidth + mugsParams.initialDelay;
      const mug = new Mug(stage, determineTypeOfBeer(), place);
      mug.hidden = true;
      mugsOnLine.addElement(mug);
      return new Map([[mug, place]]);
    }()),
    lastTime: Date.now(),
  },
});
