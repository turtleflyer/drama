import { ActorsSet, RoleClass } from '../../../libs/actors_and_roles';
import CustomersReaction from '../actor_classes/customersReaction/CustomersReaction';
import { onPulseTick } from '../../../assets/role_classes';
import { customersReactionsParams } from '../assets/gameplay_params';

/* eslint-env browser */

const signalElement = Symbol('@@customersReactions/signalElement');

export const customersReactions = new ActorsSet();

customersReactions.getInitializer(function () {
  this.addElement(signalElement);
});

customersReactions.name = 'customersReactions';

export const createReactionRole = new RoleClass(Symbol('createReaction'))
  .registerAction(customersReactions, {
    action({ target, event: { reactionType } }) {
      if (target === signalElement) {
        customersReactions.addElement(new CustomersReaction(reactionType));
      }
    },
  })
  .start();

export const watchReactionsLifeRole = onPulseTick.registerAction(customersReactions, {
  action({ target: reaction }) {
    if (reaction !== signalElement) {
      if (Date.now() - reaction.state.lastTime >= customersReactionsParams.lifeTime) {
        this.roleSet.deleteElement(reaction);
        reaction.remove();
      }
    }
  },
});
