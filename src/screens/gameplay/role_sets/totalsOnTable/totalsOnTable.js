/* eslint-env browser */
import { ActorsSet, registerActionOfType } from '../../../../libs/actors_and_roles';
import { onPulseTick } from '../../../../stage/role_classes';
import TotalOnTable from './TotalOnTableClass';
import { totalsParams } from './totalsOnTable_params';
import { removeElementWhenAnimationEnds } from '../../../../libs/helpers_lib';

const signalElement = Symbol('@@totalsOnTable/signalElement');
let elementsToCreate;

export const totalsOnTable = new ActorsSet();
totalsOnTable.getInitializer(function () {
  this.addElement(signalElement);
  elementsToCreate = [];
});

totalsOnTable.name = 'totalsOnTable';

totalsOnTable.createNew = function (isPositive, horizontalPosition) {
  elementsToCreate.push({
    value: isPositive ? totalsParams.valueToCreate : -totalsParams.valueToCreate,
    horizontalPosition,
    nextQuant: Date.now(),
  });
};

registerActionOfType('animationend', totalsOnTable, {
  action: removeElementWhenAnimationEnds,
}).start();

export const manageTotalsRole = onPulseTick.registerAction(totalsOnTable, {
  action({ target: totalPiece, roleSet }) {
    const currTime = Date.now();
    if (totalPiece === signalElement && elementsToCreate.length > 0) {
      elementsToCreate = elementsToCreate.filter((entry) => {
        if (entry.nextQuant < currTime) {
          roleSet.addElement(new TotalOnTable(entry.horizontalPosition, entry.value > 0));
          entry.value = entry.value > 0 ? entry.value - 1 : entry.value + 1;
          entry.nextQuant += totalsParams.creationTimeout;
        }
        return entry.value !== 0;
      });
    }
  },
});
