/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import { onPulseTick } from '../../../assets/role_classes';

export const fillingMugs = new ActorsSet();

fillingMugs.name = 'fillingMugs';

export const fillMugsRole = onPulseTick.registerAction(fillingMugs, {
  action({ target: mug }) {
    if (this.roleSet.size > 0) {
      const { faucet } = mug.state;
      if (faucet.state.isOpened) {
        const currTime = Date.now();
        if (mug.state.overfilled) {
          if (mug.state.whenSwitchNextOverfilledPhase) {
            if (currTime > mug.state.whenSwitchNextOverfilledPhase) {
              // prettier-ignore
              mug.state.overfilledPhase = (mug.state.overfilledPhase + 1)
                % mug.params.numberOfOverfilledPhases;
              mug.state.whenSwitchNextOverfilledPhase += mug.params.overfilledAnimationPhaseTime;
              mug.updateFillRepresentation();
            }
          } else {
            // prettier-ignore
            mug.state.whenSwitchNextOverfilledPhase = currTime
            + mug.params.overfilledAnimationPhaseTime;
            mug.updateFillRepresentation();
          }
        } else if (mug.state.lastTime) {
          let beerQuantity = (currTime - mug.state.lastTime) / 1000 / mug.params.volume;
          const overfilledQuantity = mug.state.total + beerQuantity - 1;
          // prettier-ignore
          beerQuantity = overfilledQuantity > 0
            ? beerQuantity - overfilledQuantity : beerQuantity;
          // prettier-ignore
          mug.state.beers[faucet.state.beer] = (mug.state.beers[faucet.state.beer] || 0)
                + beerQuantity;
          mug.state.total += beerQuantity;
          if (mug.state.total === 1) {
            mug.state.overfilled = true;
            mug.state.overfilledPhase = 0;
            // prettier-ignore
            mug.state.whenSwitchNextOverfilledPhase = currTime
                  + mug.params.overfilledAnimationPhaseTime / 2
                  + (mug.state.nextFillThreshold - 1 - overfilledQuantity)
                  / mug.params.volume * 1000;
          } else if (mug.state.total >= mug.state.nextFillThreshold) {
            mug.state.fillingPhase += 1;
            mug.updateNextThreshold().updateFillRepresentation();
          }
        }
        mug.state.lastTime = currTime;
      } else {
        mug.state.lastTime = null;
        mug.state.whenSwitchNextOverfilledPhase = null;
      }
    }
  },
});
