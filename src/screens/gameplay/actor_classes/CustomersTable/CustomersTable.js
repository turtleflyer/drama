/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { customersTablePosition } from '../../assets/gameplay_params';
import tableImg from './img/table.png';
import { setImg } from '../../../../libs/helpers_lib';
import stage from '../../../../role_sets/stage/stage';

export default class CustomersTable extends Actor {
  constructor() {
    super(document.createElement('div'), customersTablePosition);
    setImg(this, tableImg, { width: '100%' });
    this.getAppendedAsChild(stage);
    this.attachClassName('customersTable');
  }
}
