/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import { onPulseTick } from '../../../assets/role_classes';
import { waitingTimeMugDisappear } from '../assets/gameplay_params';
import stage from '../../../role_sets/stage/stage';
import { createReactionRole } from './customersReactions';

export const waitingMugs = new ActorsSet();

waitingMugs.name = 'waitingMugs';

waitingMugs.onAddActorEvent(({ target: mug }) => {
  mug.carriedToCustomer();
});

export const waitMugDisappearRole = onPulseTick.registerAction(waitingMugs, {
  action({ target: mug }) {
    if (this.roleSet.size > 0) {
      const currTime = Date.now();
      const { waitingSince } = mug.state;
      if (currTime - waitingSince >= waitingTimeMugDisappear) {
        const { money, reaction } = mug.turnIntoMoney();
        stage.state.money += money;
        this.roleSet.deleteElement(mug);
        mug.remove();
        createReactionRole.fire({ reactionType: reaction });
      }
    }
  },
});
