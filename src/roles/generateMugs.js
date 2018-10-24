/* eslint-env browser */
import onPulseTick from '../role_classes/onPulseTick';
import { mugsOnLine, signalElementAmongMugs } from '../role_sets/mugsOnLine';
import {
  stageDimension, tuneGame, beerTypes, mugsParams,
} from '../common_params';
import stage from '../role_sets/stage';
import Mug from '../actor_classes/Mug';

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
        console.log('stage.reputation: ', stage.reputation);
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
    // const { initMugDensity, reputation } = stage;
    // const mugDensity = initMugDensity * (reputation / 100);
    // if (!positionsMap) {
    //   const newMugType = determineTypeOfBeer();
    //   const newbornPosition = stageWidth - 1 + mugTypes[newMugType].width / 2;
    //   const newbornMug = new Mug(stage, newMugType, newbornPosition);
    //   this.actorsSet.addElement(newbornMug);
    //   memory.positionsMap = new Map([[newbornMug, newbornPosition]]);
    //   memory.lastPosition = newbornPosition;
    //   memory.lastTime = currTime;
    //   memory.lastMug = newbornMug;
    // } else {
    //   if (!target || target.left >= lastPosition) {
    //     const shift = ((currTime - lastTime) / 1000) * stage.mugsSpeed;
    //     let expectedNewbornPosition;
    //     for (const [mug, position] of positionsMap.entries()) {
    //       const newPosition = position + shift;
    //       positionsMap.set(mug, newPosition);
    //       if (mug === lastMug) {
    //         expectedNewbornPosition = newPosition
    //           + mug.width
    //           + (stageWidth * 0.6 - lastMug.width * mugDensity) / (mugDensity - 1);
    //       }
    //     }
    //     memory.lastTime = currTime;
    //     if (expectedNewbornPosition < stageWidth) {
    //       const newbornMug = new Mug(stage, beerTypes.BEER_IPA, expectedNewbornPosition);
    //       this.roleSet.addElement(newbornMug);
    //       positionsMap.set(newbornMug, expectedNewbornPosition);
    //       memory.lastMug = newbornMug;
    //     }
    //   }
    //   if (target) {
    //     const newPosition = positionsMap.get(target);
    //     if (newPosition + target.width <= 0) {
    //       target.node.remove();
    //       this.unit.delete(target);
    //       positionsMap.delete(target);
    //       stage.reputation += tuneGame.reputationDecrement;
    //     } else {
    //       target.setPosition({ left: newPosition });
    //       memory.lastPosition = newPosition;
    //     }
    //   }
    // }
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
