/* eslint-env browser */
import mugImg from './img/mug1.png';
import EventsWork from './eventswork';

const eventWorker = new EventsWork();
const {
  makeUnit, registerEventType, fireEvent, eventChain,
} = eventWorker;

const scene = document.querySelector('#scene');

const beerBar = {
  className: 'main',
  nested: [
    scene,
    {
      className: 'beer-mug',
      nested: [
        {
          tag: 'img',
          attributes: {
            src: mugImg,
          },
        },
      ],
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
