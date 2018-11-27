/* eslint-env browser */
import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../role_sets/stage/stage';
import tableImg from './img/table.png';
import { customersTablePosition } from '../../assets/gameplay_params';
import { setImg } from '../../../../libs/helpers_lib';

class CustomersTable extends Actor {
  constructor() {
    super('div', customersTablePosition, stage.scaleF);
    setImg(this, tableImg, { width: '100%' });
    this.getAppendedAsChild(stage);
    this.attachClassName('customersTable');
  }
}

// eslint-disable-next-line
export const customersTable = new ActorsSet();
customersTable.getInitializer(function () {
  this.addElement(new CustomersTable());
});

customersTable.name = 'customersTable';
