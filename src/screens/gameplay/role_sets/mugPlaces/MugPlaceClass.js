/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { mugPlacesParams } from './mugPlaces_params';
import { addWhereToPlaceMugMethod } from './mugPlaceClass_decorators';

export default class MugPlace extends Actor {
  constructor(faucet) {
    super('div', faucet.params.mugPlacePosition, { scaleF: stage.scaleF, zIndex: 70 });
    this.faucet = faucet;
    faucet.mugPlace = this;
    this.getAppendedAsChild(faucet);

    /**
     * Debugging purpose
     */
    this.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';
  }
}

addWhereToPlaceMugMethod(MugPlace, mugPlacesParams);
