/* eslint-env browser */
import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { damagesParams } from './damages_params';
import './styles.css';
import { removeAfterAnimationEnds } from '../../../../libs/helpers_lib';
import { setA } from '../../supersets/setA';

class Damage extends Actor {
  constructor(place, phase) {
    super('div', damagesParams.position[phase], { scaleF: stage.scaleF, zIndex: 72 });
    this.node.textContent = `-$${damagesParams.quant}`;
    this.getAppendedAsChild(place);
    this.attachClassName('damages');
  }
}

// eslint-disable-next-line
export const damages = new ActorsSet();

damages.name = 'damages';

damages.addDamage = function (place, phase) {
  this.addElement(new Damage(place, phase));
};

removeAfterAnimationEnds(damages);

setA.addElement(damages);
