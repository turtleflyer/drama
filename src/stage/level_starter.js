import stage from './stage';
import { setA } from '../screens/gameplay/supersets/setA';
import { startStopRoles } from '../roles_manipulators';
import { highlightPlacesRole } from '../screens/gameplay/supersets/dropPlaces';
import { highlightHandlesRole } from '../screens/gameplay/role_sets/faucetHandles/faucetHandles';

// eslint-disable-next-line
export function startLevel(level) {
  setA
    .getCleaner()
    .fireAndWaitWhenExhausted()
    .then(() => {
      stage.defineLevel(level);
      return setA.getInitializer().fireAndWaitWhenExhausted();
    })
    .then(() => {
      startStopRoles.start();
      highlightPlacesRole.fire();
      highlightHandlesRole.fire();
    });
}
