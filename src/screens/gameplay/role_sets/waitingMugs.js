/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import { onPulseTick } from '../../../assets/role_classes';
import { waitingTimeMugDisappear } from '../assets/gameplay_params';

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
        this.roleSet.deleteElement(mug);
        // const { money, reaction } = countProfit(mug);
        // commonParams.money += money;
        // fireEvent(getUnit('Score'), 'updateMoney');
        mug.remove();
      }
    }
  },
});
