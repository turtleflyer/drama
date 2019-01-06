/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { customersTable } from '../staticDecorations/staticDecorations';
import { hookPlaceParams } from './hooksPlace_params';
import { makePlaceAbleHighlighting } from '../../../../debug/highlight_zone_class_assets';

export default class HookPlace extends Actor {
  constructor() {
    super('div', hookPlaceParams.position, { scaleF: stage.scaleF, zIndex: 30 });
    this.getAppendedAsChild(customersTable);
  }

  whereToPlaceMug() {
    const { y: originY } = stage.origin;
    const { top, height } = this.node.getBoundingClientRect();
    return { y: (top - originY + height * hookPlaceParams.mugLine) / this.position.scaleF };
  }
}

makePlaceAbleHighlighting(HookPlace);
