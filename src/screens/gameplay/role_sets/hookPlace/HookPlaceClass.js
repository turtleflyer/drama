/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { hookPlaceParams } from './hooksPlace_params';
import { makePlaceAbleHighlighting } from '../../../../debug/highlightZonesCheck_lib';

export default class HookPlace extends Actor {
  constructor() {
    super('div', hookPlaceParams.position, { scaleF: stage.scaleF, zIndex: 30 });
    this.getAppendedAsChild(stage);
  }

  whereToPlaceMug({ position: { y: mugY }, rectHeight }) {
    const {
      position: { top, height },
    } = this;
    return {
      y: (mugY - rectHeight / 2 - top - height / 2) * 0.5 + top + height / 2 + rectHeight / 2,
    };
  }
}

makePlaceAbleHighlighting(HookPlace);
