/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { mugPlacesParams } from './mugPlaces_params';
import { addWhereToPlaceMugMethod } from './mugPlaceClass_decorators';
import { makePlaceAbleHighlighting } from '../../../../debug/hilight_zone_class_decorator';

export default class MugPlace extends Actor {
  constructor(faucet) {
    super('div', faucet.params.mugPlacePosition, { scaleF: stage.scaleF, zIndex: 70 });
    this.faucet = faucet;
    faucet.mugPlace = this;
    this.getAppendedAsChild(faucet);
  }
}

addWhereToPlaceMugMethod(MugPlace, mugPlacesParams);

makePlaceAbleHighlighting(MugPlace);
