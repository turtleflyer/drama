import { Actor } from '../../../libs/actors_and_roles';
import { customersTablePosition } from '../assets/gameplay_params';

/* eslint-env browser */

export default class HookPlace extends Actor {
  constructor(table) {
    super(document.createElement('div'), customersTablePosition.hookPlace);
    this.getAppendedAsChild([...table][0]);
    this.attachClassName('hookPlace');
  }
}
