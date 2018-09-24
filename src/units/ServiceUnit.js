/* eslint-env browser */
import { commonParams, getUnit, parseDescription } from '../gamelibrary';
import { fireEvent } from '../eventswork';

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
