/* eslint-env browser */
import {
  makeUnit,
  registerUnit,
  getRegisteredUnit,
  registerEventType,
  fireEvent,
  eventChain,
} from './eventswork';
import { appendPx, makeScalable } from './gamelabrary';
import BeerMug from './elements/BeerMug/BeerMug';

const scene = document.querySelector('#scene');
const firstMug = BeerMug.render(0, 0, 50, null);

const beerBar = {
  className: 'main',
  nested: [
    scene,
    {
      className: 'beer-mug',
      nested: [firstMug],
    },
  ],
};

const mechanism = {
  registerEvents: {
    tick50: {
      createAction: (action) => {
        let time = Date.now();
        return (data) => {
          const { target, type } = data;
          action(data);
          window.setTimeout(() => {
            const prevTime = time;
            time = Date.now();
            fireEvent(target, type, { timeout: time - prevTime });
          }, 10);
        };
      },
    },
  },
};

export {
  scene, beerBar, mechanism, eventWorker,
};
