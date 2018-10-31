/* eslint-env browser */
import { mugsOnLine, signalElementAmongMugs } from '../mugsOnLine';
import stage from '../../../../../role_sets/stage/stage';
import Mug from '../../../actor_classes/Mug/Mug';
import { stageDimension } from '../../../../../assets/common_params';
import { beerTypes, tuneGame, mugsParams } from '../../../assets/gameplay_params';
import { onPulseTick } from '../../../../../assets/role_classes';

function determineTypeOfBeer() {
  return beerTypes.IPA;
}

const { width: stageWidth } = stageDimension;

export default onPulseTick.registerAction(mugsOnLine, {
  action({ target }) {
    const currTime = Date.now();
    const { memory } = this;
    const { mugsSpeed, initMugDensity } = stage.levelParams;
    const { reputation } = stage.gameState;
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
        this.roleSet.deleteElement(target);
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
  initMemoryState() {
    const place = stageWidth + mugsParams.initialDelay;
    const mug = new Mug(stage, determineTypeOfBeer(), place);
    mug.hidden = true;
    this.roleSet.addElement(mug);
    return {
      placeholdersMap: new Map([[mug, place]]),
      lastTime: Date.now(),
    };
  },
});
