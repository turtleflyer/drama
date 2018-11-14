/* eslint-env browser */
import './styles.css';
import './screens/gameplay/role_sets/mugsOnLine/mugsOnLine';
import { setA } from './screens/gameplay/supersets/setA';
import { startStopLevel } from './roles_manipulators';
import './debug/stopButton';
import './debug/levelForm';

setA.getInitializer().fireAndWaitWhenExhausted()(() => {
  startStopLevel.start();
});
