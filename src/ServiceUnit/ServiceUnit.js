/* eslint-env browser */
import {
  registeredUnites,
  appendPx,
  makeScalable,
  setOrigin,
  parseDescription,
} from '../gamelabrary';
import {
  makeUnit,
  registerUnit,
  getRegisteredUnit,
  registerEventType,
  fireEvent,
  eventChain,
} from '../eventswork';

const ServiceUnit = {
  name: 'ServiceUnit',

  mechanism: {
    tick10: {
      regAsCustom: true,
      action: () => {
        fireEvent(registeredUnites.Scene, 'ontick10');
        window.setTimeout(() => {
          fireEvent(registeredUnites.ServiceUnit, 'tick10');
        }, 1000);
      },
      fireImmediately: true,
    },
  },
};

export default ServiceUnit;
