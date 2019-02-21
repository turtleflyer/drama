/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';
import { onPulseTick } from '../../../../stage/role_classes';
import TotalOnTable from './TotalOnTableClass';
import { totalsParams } from './totalsOnTable_params';
import { removeAfterAnimationEnds } from '../../../../libs/helpers_lib';
import { startStopRoles } from '../../../../roles_manipulators';
import { setA } from '../../supersets/setA';

const signalElement = Symbol('@@totalsOnTable/signalElement');
let elementsToCreate;

export const totalsOnTable = new ActorsSet();
totalsOnTable.getInitializer(function () {
  this.addElement(signalElement);
  elementsToCreate = [];
});

totalsOnTable.name = 'totalsOnTable';

totalsOnTable.createNew = function (isPositive, position) {
  elementsToCreate.push({
    value: isPositive ? totalsParams.valueToCreate : -totalsParams.valueToCreate,
    position,
    nextQuant: performance.now(),
  });
};

removeAfterAnimationEnds(totalsOnTable);

export const manageTotalsRole = onPulseTick.registerAction(totalsOnTable, {
  action({ target: totalPiece, roleSet, event }) {
    if (totalPiece === signalElement && elementsToCreate.length > 0) {
      const currTime = performance.now();
      const timeToAdjustDueBeenPaused = (event && event.beenOnPause) || 0;
      elementsToCreate = elementsToCreate.filter((entry) => {
        entry.nextQuant += timeToAdjustDueBeenPaused;
        if (entry.nextQuant < currTime) {
          roleSet.addElement(new TotalOnTable(entry.position, entry.value > 0));
          entry.value = entry.value > 0 ? entry.value - 1 : entry.value + 1;
          entry.nextQuant += totalsParams.creationTimeout;
        }
        return entry.value !== 0;
      });
    }
  },
});

startStopRoles.addElement(manageTotalsRole);
setA.addElement(totalsOnTable);
