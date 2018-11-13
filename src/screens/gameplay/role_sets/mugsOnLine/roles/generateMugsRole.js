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
  action({ target: mug }) {
    const currTime = Date.now();
    const { memory } = this;
    const { mugsSpeed, initMugDensity } = stage.params.levelParams;
    const { placeholdersMap, lastTime } = memory;

    if (this.roleSet.size > 2 || (() => [...placeholdersMap.values()].pop())() < 2 * stageWidth) {
      // Determine if it is a time to calculate placeholders shift
      if (mug === signalElementAmongMugs) {
        // [...placeholdersMap.entries()].forEach(([mug, position]) => {
        for (const [processingMug, horizontalPosition] of placeholdersMap.entries()) {
          // prettier-ignore
          const calculatedPosition = horizontalPosition
            + ((currTime - lastTime) * mugsSpeed) / 1000;

          // Check if the mug disappeared from the stage
          if (calculatedPosition < -(processingMug.position.width / 2)) {
            placeholdersMap.delete(processingMug);
            if (this.roleSet.has(processingMug)) {
              this.roleSet.deleteElement(processingMug);
              processingMug.remove();
              stage.state.reputation += tuneGame.reputationDecrement;
            }
          } else {
            placeholdersMap.set(processingMug, calculatedPosition);
          }
        }
        memory.lastTime = currTime;
      } else {
        const horizontalPosition = placeholdersMap.get(mug);
        mug.setPosition({ x: horizontalPosition });

        // Check if the hidden mug is appearing on the stage. In this case a new mug is generating
        if (mug.state.hidden && horizontalPosition < stageWidth + mug.position.width / 2) {
          mug.appearOnStage();
          const mugDensity = initMugDensity * stage.state.reputation;
          const placeWhereCreate = horizontalPosition + (stageWidth * 0.6) / mugDensity;
          const createdMug = new Mug(stage, determineTypeOfBeer(), placeWhereCreate);
          placeholdersMap.set(createdMug, placeWhereCreate);
          this.roleSet.addElement(createdMug);
        }
      }
    }
  },

  initMemoryState() {
    const place = stageWidth + mugsParams.initialDelay;
    const mug = new Mug(stage, determineTypeOfBeer(), place);
    this.roleSet.addElement(mug);
    return {
      placeholdersMap: new Map([[mug, place]]),
      lastTime: Date.now(),
    };
  },
});
