/* eslint-env browser */
import {
  GameActor, appendPx, makeScalable, setOrigin, parseDescription,
} from '../gamelabrary';
import {
  makeUnit, registerEventType, fireEvent, eventChain,
} from '../eventswork';

export default parseDescription({
  ServiceUnit: {
    mechanism: {
      tick: {
        regAsCustom: true,
        action: toolkit => () => {
          fireEvent(toolkit.getUnit('Scene'), 'ontick');
          window.setTimeout(() => {
            fireEvent(toolkit.getUnit('ServiceUnit'), 'tick');
          }, 17);
        },
        fireImmediately: true,
      },
    },
  },
});
