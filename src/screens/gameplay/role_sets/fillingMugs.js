/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import { onPulseTick } from '../../../assets/role_classes';

export const fillingMugs = new ActorsSet();

fillingMugs.name = 'fillingMugs';

// fillingMugs.onAddActorEvent(({ event: { addedElement: mug } }) => {
// });

export const fillMugsRole = onPulseTick
  .registerAction(fillingMugs, {
    action({ target: mug }) {
      if (this.roleSet.size > 0) {
        const { fillingState, params } = mug;
        const { activeState } = fillingState.faucet;
        if (activeState.isOpened) {
          const currTime = Date.now();
          if (fillingState.lastTime) {
            if (fillingState.overfilled) {
              if (fillingState.whenSwitchNextOverfilledPhase) {
                if (currTime > fillingState.whenSwitchNextOverfilledPhase) {
                  // prettier-ignore
                  fillingState.overfilledPhase = (fillingState.overfilledPhase + 1)
                    % params.numberOfOverfilledPhases;
                  fillingState.whenSwitchNextOverfilledPhase += params.overfilledAnimationPhaseTime;
                  mug.updateFillRepresentation();
                }
              } else {
                // prettier-ignore
                fillingState.whenSwitchNextOverfilledPhase = currTime
                  + params.overfilledAnimationPhaseTime;
              }
            } else {
              let beerQuantity = (currTime - fillingState.lastTime) / 1000 / params.volume;
              const overfilledQuantity = fillingState.total + beerQuantity - 1;
              // prettier-ignore
              beerQuantity = overfilledQuantity > 0
                ? beerQuantity - overfilledQuantity : beerQuantity;
              // prettier-ignore
              fillingState.beers[activeState.beer] = (fillingState.beers[activeState.beer] || 0)
                + beerQuantity;
              fillingState.total += beerQuantity;
              const { total } = fillingState;
              if (total === 1) {
                fillingState.overfilled = true;
                fillingState.overfilledPhase = -1;
                // prettier-ignore
                fillingState.whenSwitchNextOverfilledPhase = currTime
                  + params.overfilledAnimationPhaseTime / 2
                  + (fillingState.nextFillThreshold - 1 - overfilledQuantity)
                  / params.volume * 1000;
              } else if (total >= fillingState.nextFillThreshold) {
                fillingState.fillingPhase += 1;
                mug.updateNextThreshold().updateFillRepresentation();
              }
            }
          }
          fillingState.lastTime = currTime;
        } else {
          fillingState.whenSwitchNextOverfilledPhase = null;
        }
      }
    },
  })
  .start();
