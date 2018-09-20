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
      tickAnimation: {
        type: 'tickAnimation',
        regAsCustom: true,
        action() {
          fireEvent(getUnit('AllUnits'), 'onTick');
          window.setTimeout(() => {
            fireEvent(this.unit, 'tickAnimation');
          }, commonParams.tickTimeout);
        },
        fireImmediately: true,
      },
    },
  },
});
