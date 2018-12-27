/* eslint-env browser */
import './debug/stopButton';
import './debug/levelForm';
import './debug/resultButton';
import { whenAllURLRetrieved } from './libs/session_storage_lib';
import { waitWhenTypeExhausted } from './libs/eventswork';
import { startLevel } from './stage/level_starter';

waitWhenTypeExhausted('onAddElement')
  .then(whenAllURLRetrieved)
  .then(startLevel(0));
