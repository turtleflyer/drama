/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { customersTablePosition } from '../../assets/gameplay_params';
import tableImg from './img/table.png';
import { setImg } from '../../../../libs/helpers_lib';

export default class CustomersTable extends Actor {
  constructor(stage) {
    super(document.createElement('div'), customersTablePosition, stage.scaleF);
    setImg(this, tableImg, { width: '100%' });
    this.getAppendedAsChild(stage);
    this.attachClassName('customersTable');
  }
}
