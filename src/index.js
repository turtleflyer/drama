/* eslint-env browser */
import { setA } from './screens/gameplay/supersets/setA';
import { startStopLevel } from './roles_manipulators';
import './debug/stopButton';
import './debug/levelForm';
import './debug/totalButton';

setA.getInitializer().fireAndWaitWhenExhausted()(() => {
  startStopLevel.start();
});
