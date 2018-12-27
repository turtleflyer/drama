import stage from './stage';
import { setA } from '../screens/gameplay/supersets/setA';
import { startStopLevel } from '../roles_manipulators';

// eslint-disable-next-line
export function startLevel(level) {
  setA
    .getCleaner()
    .fireAndWaitWhenExhausted()
    .then(() => {
      stage.defineLevel(level);
      return setA.getInitializer().fireAndWaitWhenExhausted();
    })
    .then(() => startStopLevel.start());
}
