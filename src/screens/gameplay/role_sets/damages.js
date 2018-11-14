import { ActorsSet } from '../../../libs/actors_and_roles';
import { onPulseTick } from '../../../assets/role_classes';
import { damagesParams } from '../assets/gameplay_params';

export const damages = new ActorsSet();

damages.name = 'damages';

damages.onAddActorEvent(({ target: damage }) => {
  damage.bornTime = Date.now();
});

export const inspectDamageToDisappearRole = onPulseTick.registerAction(damages, {
  action({ target: damage, roleSet }) {
    if (roleSet.size > 0) {
      if (Date.now() - damage.bornTime > damagesParams.lifeTime) {
        roleSet.deleteElement(damage);
        damage.remove();
      }
    }
  },
});
