/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import CustomersReaction from '../actor_classes/customersReaction/CustomersReaction';
import { customersReactionsParams } from '../assets/gameplay_params';

// eslint-disable-next-line
export const customersReactions = new ActorsSet();

customersReactions.createNew = function (reactionType) {
  this.addElement(new CustomersReaction(reactionType));
};

customersReactions.onAddActorEvent(function ({ target: reaction }) {
  window.setTimeout(() => {
    this.deleteElement(reaction);
    reaction.remove();
  }, customersReactionsParams.lifeTime);
});

customersReactions.name = 'customersReactions';
