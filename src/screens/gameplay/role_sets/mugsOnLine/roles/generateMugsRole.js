/* eslint-env browser */
import { mugsOnLine, signalElementAmongMugs } from '../mugsOnLine';
import { stage } from '../../../../../role_sets/stage/stage';
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

    if (this.roleSet.size > 2 || (() => [...placeholdersMap.values()].pop())() < 2 * stageWidth) {
      // Determine if it is a time to calculate placeholders shift
      if (target === signalElementAmongMugs) {
        // [...placeholdersMap.entries()].forEach(([mug, position]) => {
        for (const [mug, position] of placeholdersMap.entries()) {
          const { width } = mug;
          const calculatedPosition = position + ((currTime - lastTime) * mugsSpeed) / 1000;

          // Check if the mug disappeared from the stage
          if (calculatedPosition < -(width / 2)) {
            placeholdersMap.delete(mug);
            if (this.roleSet.has(mug)) {
              this.roleSet.deleteElement(mug);
              mug.remove();
              stage.gameState.reputation += tuneGame.reputationDecrement;
            }
          } else {
            placeholdersMap.set(mug, calculatedPosition);
          }
        }
        memory.lastTime = currTime;
      } else {
        const position = placeholdersMap.get(target);
        target.setPosition({ x: position });
        const { width } = target;

        // Check if the hidden mug is appearing on the stage. In this case a new mug is generating
        if (target.hidden && position < stageWidth + width / 2) {
          target.hidden = false;
          const mugDensity = initMugDensity * reputation;
          const createdPlace = position + (stageWidth * 0.6) / mugDensity;
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
