import { faucets } from '../faucets/faucets';
import { registerActionOfType, ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import { setA } from '../../supersets/setA';
import {
  highlightPlaces,
  highlightAction,
  makePlaceAbleHighlighting,
} from '../../../../debug/highlightZonesCheck_lib';
import stage from '../../../../stage/stage';

export default class FaucetHandle extends Actor {
  constructor(faucet) {
    super('div', faucet.params.handlePosition, { scaleF: stage.scaleF, zIndex: 70 });
    this.faucet = faucet;
    faucet.switchHandle = this;
    faucet.node.appendChild(this.node);
  }
}

makePlaceAbleHighlighting(FaucetHandle);

export const faucetHandles = new ActorsSet();
faucetHandles.getInitializer(function () {
  this.addElements([...faucets].map(faucet => new FaucetHandle(faucet)));
});

faucetHandles.name = 'faucetHandles';

export const switchFaucetStateRole = registerActionOfType('click', faucetHandles, {
  action({ target: handle, event }) {
    event.preventDefault();
    event.stopPropagation();
    const { faucet } = handle;
    faucet.switch();
  },
}).start();

export const highlightHandlesRole = highlightPlaces
  .registerAction(faucetHandles, {
    action: highlightAction,
  })
  .start();

setA.addElement(faucetHandles);
