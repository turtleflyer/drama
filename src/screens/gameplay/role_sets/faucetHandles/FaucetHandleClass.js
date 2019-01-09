/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { makePlaceAbleHighlighting } from '../../../../debug/highlight_zone_class_assets';

export default class FaucetHandle extends Actor {
  constructor(faucet) {
    super('div', faucet.params.handlePlacePosition, { scaleF: stage.scaleF, zIndex: 70 });
    this.faucet = faucet;
    faucet.switchHandle = this;
    faucet.node.appendChild(this.node);
  }
}

makePlaceAbleHighlighting(FaucetHandle);
