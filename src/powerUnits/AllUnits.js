/* eslint-env browser */
import { getUnit, parseDescription } from '../gamelibrary';

let sceneTarget;

export default parseDescription({
  AllUnits: {
    nested: () => [
      getUnit('Scene'),
      getUnit('Mugs'),
      getUnit('DragMug'),
      getUnit('FallenMug'),
      getUnit('Bar'),
      getUnit('Faucets'),
      getUnit('FaucetSwitches'),
      getUnit('DropPlaces'),
      getUnit('Damages'),
      getUnit('MugWaiting'),
      getUnit('Score'),
    ],

    mechanism: {
      stop: {
        type: 'stop',
        customType: true,
        action({ unit, target }) {
          if (unit !== this.unit) {
            unit.description.toTerminate = true;
            if (target !== sceneTarget) {
              target.node.remove();
              unit.clear();
            }
          }
          setTimeout(() => {
            this.toTerminate = true;
          }, 500);
        },
      },
    },
  },
});
