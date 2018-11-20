/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import { onPulseTick } from '../../../assets/role_classes';
import { damagesParams, totalsParams } from '../assets/gameplay_params';
import TotalOnTable from '../actor_classes/TotalOnTable';

const signalElement = Symbol('@@totalsOnTable/signalElement');
let elementsToCreate;

export const totalsOnTable = new ActorsSet();
totalsOnTable.getInitializer(function () {
  this.addElement(signalElement);
  elementsToCreate = [];
});

totalsOnTable.name = 'totalsOnTable';

totalsOnTable.onAddActorEvent(function ({ target: totalPiece }) {
  if (totalPiece !== signalElement) {
    window.setTimeout(() => {
      this.deleteElement(totalPiece);
      totalPiece.remove();
    }, damagesParams.lifeTime);
  }
});

totalsOnTable.createNew = function (isPositive, horizontalPosition) {
  elementsToCreate.push({
    value: isPositive ? totalsParams.valueToCreate : -totalsParams.valueToCreate,
    horizontalPosition,
    nextQuant: Date.now(),
  });
};

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
