/* eslint-env browser */
import { commonParams, GameActor, parseDescription } from '../gamelibrary';
import mugIPA from '../img/IPA_mug_empty.png';
import { setImg } from '../helperslib';
import {
  beerTypes, mugLineParams, sceneDimension, tuneGame,
} from '../usingparams';

const { topDistance } = mugLineParams;

export default parseDescription({
  MugsOnLine: {
    renderMug(type, left) {
      const element = new GameActor(document.createElement('div'), { left, top: topDistance });
      switch (type) {
        case beerTypes.BEER_IPA: {
          element.setPosition({ width: 50 });
          setImg(element, mugIPA, { width: '100%' });
          element.beerType = type;
          element.load = {};
          commonParams.scene.appendChild(element.node);
          return element;
        }

        default:
          return null;
      }
    },

    getType() {
      return beerTypes.BEER_IPA;
    },

    mechanism: {
      onTick: {
        type: 'onTick',
        customType: true,
        action({ target, memory }) {
          const currTime = Date.now();
          const {
            positionsMap, lastPosition, lastTime, lastMug,
          } = memory;
          const { width: sceneWidth } = sceneDimension;
          const { initMugDensity, reputation } = commonParams;
          const mugDensity = initMugDensity * (reputation / 100);
          if (!positionsMap) {
            const newbornPosition = sceneWidth - 1;
            const newbornMug = this.renderMug(this.getType(), newbornPosition);
            this.unit.addElement(newbornMug);
            memory.positionsMap = new Map([[newbornMug, newbornPosition]]);
            memory.lastPosition = newbornPosition;
            memory.lastTime = currTime;
            memory.lastMug = newbornMug;
          } else {
            if (!target || target.left >= lastPosition) {
              const shift = ((currTime - lastTime) / 1000) * commonParams.mugsSpeed;
              let expectedNewbornPosition;
              for (const [mug, position] of positionsMap.entries()) {
                const newPosition = position + shift;
                positionsMap.set(mug, newPosition);
                if (mug === lastMug) {
                  expectedNewbornPosition = newPosition
                    + mug.width
                    + (sceneWidth * 0.6 - lastMug.width * mugDensity) / (mugDensity - 1);
                }
              }
              memory.lastTime = currTime;
              if (expectedNewbornPosition < sceneWidth) {
                const newbornMug = this.renderMug(this.getType(), expectedNewbornPosition);
                this.unit.addElement(newbornMug);
                positionsMap.set(newbornMug, expectedNewbornPosition);
                memory.lastMug = newbornMug;
              }
            }
            if (target) {
              const newPosition = positionsMap.get(target);
              if (newPosition + target.width <= 0) {
                target.node.remove();
                this.unit.delete(target);
                positionsMap.delete(target);
                commonParams.reputation += tuneGame.reputationDecrement;
              } else {
                target.setPosition({ left: newPosition });
                memory.lastPosition = newPosition;
              }
            }
          }
        },
      },
    },
  },
});
