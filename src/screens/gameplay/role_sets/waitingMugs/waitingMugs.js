/* eslint-env browser */
import { ActorsSet, registerActionOfType } from '../../../../libs/actors_and_roles';
import { onPulseTick } from '../../../../stage/role_classes';
import stage from '../../../../stage/stage';
import { customersReactions } from '../customersReactions/customersReactions';
import { waitingMugParams } from './waitingMugs_params';
import { removeElementWhenAnimationEnds } from '../../../../libs/helpers_lib';

export const waitingMugs = new ActorsSet();

waitingMugs.name = 'waitingMugs';

registerActionOfType('animationend', waitingMugs, {
  action: removeElementWhenAnimationEnds,
}).start();

waitingMugs.onAddActorEvent(({ target: mug }) => {
  mug.carriedToCustomer();
});

export const waitMugDisappearRole = onPulseTick.registerAction(waitingMugs, {
  action({ target: mug }) {
    if (this.roleSet.size > 0) {
      const currTime = Date.now();
      const { waitingSince } = mug.state;
      if (currTime - waitingSince >= waitingMugParams.timeWhenMoneyFly) {
        mug.state.waitingSince = Infinity;
        const { money, reaction } = mug.turnIntoMoney();
        stage.state.money += money;
        customersReactions.createNew(reaction);
      }
    }
  },
});
