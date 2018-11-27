/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import { customersTablePosition } from '../assets/gameplay_params';
import stage from '../../../role_sets/stage/stage';
import { customersTable } from '../role_sets/staticDecorations/staticDecorations';

export default class HookPlace extends Actor {
  constructor() {
    super('div', customersTablePosition.hookPlace, { scaleF: stage.scaleF, zIndex: 30 });
    this.getAppendedAsChild(customersTable);

    /**
     * Debugging purpose
     */
    this.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';
  }

  mugsLine() {
    const { y: originY } = stage.origin;
    const { top, height } = this.node.getBoundingClientRect();
    return (top - originY + (height * 3) / 4) / this.position.scaleF;
  }
}
