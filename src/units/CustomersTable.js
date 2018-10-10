/* eslint-env browser */
import { parseDescription, GameActor, commonParams } from '../gamelibrary';
import tableImg from '../img/table.png';
import { toPlaceCustomersTable } from '../usingparams';
import { setImg } from '../helperslib';

let customersTable;

export default parseDescription({
  CustomersTable: {
    nested() {
      customersTable = new GameActor(document.createElement('div'), toPlaceCustomersTable);
      setImg(customersTable, tableImg, { width: '100%' });
      commonParams.scene.appendChild(customersTable.node);
      return [customersTable];
    },
  },

  HookPlace: {
    nested() {
      const hookPlace = new GameActor(
        document.createElement('div'),
        toPlaceCustomersTable.hookPlace,
      );
      customersTable.node.appendChild(hookPlace.node);
      return [hookPlace];
    },
  },
});
