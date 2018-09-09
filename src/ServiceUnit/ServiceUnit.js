/* eslint-env browser */
import {
  commonParams,
  getUnit,
  appendPx,
  GameActor,
  parseDescription,
  startModules,
} from '../gamelibrary';
import {
  makeUnit, registerEventType, fireEvent, eventChain,
} from '../eventswork';

export default parseDescription({
  ServiceUnit: {
    mechanism: {
      tick: {
        regAsCustom: true,
        action() {
          fireEvent(getUnit('Scene'), 'ontick');
          window.setTimeout(() => {
            fireEvent(this.unit, 'tick');
          }, commonParams.tickTimeout);
        },
        fireImmediately: true,
      },
    },
  },
});
