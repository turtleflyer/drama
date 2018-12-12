/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';
import { onPulseTick } from '../../../../stage/role_classes';
import stage from '../../../../stage/stage';
import { customersReactions } from '../customersReactions/customersReactions';
import { waitingMugParams } from './fillingGlass_params';

export const fillingGlass = new ActorsSet();

fillingGlass.name = 'fillingGlass';

fillingGlass.onAddActorEvent(({ target: mug }) => {
  mug.state.placed = true;
});

// export const waitMugDisappearRole = onPulseTick.registerAction(fillingGlass, {
//   action({ target: mug }) {
//     if (this.roleSet.size > 0) {
//       const currTime = Date.now();
//       const { waitingSince } = mug.state;
//       if (currTime - waitingSince >= waitingMugParams.timeWhenMoneyFly) {
//         mug.state.waitingSince = Infinity;
//         const { money, reaction } = mug.turnIntoMoney();
//         stage.state.money += money;
//         customersReactions.createNew(reaction);
//       }
//     }
//   },
// });
