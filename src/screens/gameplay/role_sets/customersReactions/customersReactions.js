/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';
import CustomersReaction from './CustomersReactionClass';
import { removeAfterAnimationEnds } from '../../../../libs/helpers_lib';
import { setA } from '../../supersets/setA';

// eslint-disable-next-line
export const customersReactions = new ActorsSet();

customersReactions.createNew = function (reactionType) {
  this.addElement(new CustomersReaction(reactionType));
};

customersReactions.name = 'customersReactions';

removeAfterAnimationEnds(customersReactions);

setA.addElement(customersReactions);
