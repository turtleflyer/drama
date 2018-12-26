/* eslint-env browser */
import { setA } from './screens/gameplay/supersets/setA';
import { startStopLevel } from './roles_manipulators';
import './debug/stopButton';
import './debug/levelForm';
import './debug/resultButton';
import { whenAllURLRetrieved } from './libs/session_storage_lib';
import { waitWhenTypeExhausted } from './libs/eventswork';

waitWhenTypeExhausted('onAddElement')
  .then(whenAllURLRetrieved)
  .then(() => setA.getInitializer().fireAndWaitWhenExhausted())
  .then(() => {
    startStopLevel.start();
  });
