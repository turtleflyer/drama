/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';
import { onPulseTick } from '../../../../assets/role_classes';
import stage from '../../../../role_sets/stage/stage';
import { customersReactions } from '../customersReactions/customersReactions';
import { waitingMugParams } from './waitingMugs_params';

export const waitingMugs = new ActorsSet();

waitingMugs.name = 'waitingMugs';

waitingMugs.onAddActorEvent(function ({ target: mug }) {
  mug.carriedToCustomer();
  window.setTimeout(() => {
    this.deleteElement(mug);
    mug.remove();
  }, waitingMugParams.lifeTime);
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
