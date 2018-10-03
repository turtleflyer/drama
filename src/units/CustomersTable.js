/* eslint-env browser */
import { parseDescription, GameActor, commonParams } from '../gamelibrary';
import tableImg from '../img/table.png';
import { toPlaceCustomersTable } from '../usingparams';
import { setImg } from '../helperslib';

export default parseDescription({
  CustomersTable: {
    nested() {
      const wrappedDiv = new GameActor(document.createElement('div'), toPlaceCustomersTable);
      setImg(wrappedDiv, tableImg, { width: '100%' });
      commonParams.scene.appendChild(wrappedDiv.node);
      const hookPlace = new GameActor(
        document.createElement('div'),
        toPlaceCustomersTable.hookPlace,
      );
      hookPlace.customersTable = true;
      wrappedDiv.node.appendChild(hookPlace.node);
      return [hookPlace];
    },
  },

  mechanism: {},
});
