/* eslint-env browser */
import { getUnit, parseDescription, commonParams } from '../gamelibrary';

export default parseDescription({
  AllUnits: {
    nested: () => [
      getUnit('Scene'),
      getUnit('Mugs'),
      getUnit('DragMug'),
      getUnit('FallenMug'),
      getUnit('BeerJet'),
      getUnit('Bar'),
      getUnit('Faucets'),
      getUnit('FaucetSwitches'),
      getUnit('DropPlaces'),
      getUnit('Damages'),
      getUnit('CustomersTable'),
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
            if (target.node !== commonParams.scene) {
              if (target.node) {
                target.node.remove();
              }
              unit.clear();
            }
          }
          [
            'BeerJet',
            'Damages',
            'MugFilling',
            'CustomersTable',
            'MugWaiting',
            'Score',
            'Scene',
            'Mugs',
            'MugsOnLine',
            'DragMug',
            'FallenMug',
            'Bar',
            'Faucets',
            'FaucetSwitches',
            'DropPlaces',
            'MugPlaces',
            'HookPlace',
            'Damages',
            'CustomersTable',
            'MugWaiting',
            'Score',
            'AllUnits'
          ].forEach((s) => {
            console.log(s, getUnit(s));
          });
          // setTimeout(() => {
          //   this.toTerminate = true;
          // }, 500);
        },
      },
    },
  },
});
