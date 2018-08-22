/* eslint-env browser */
import './styles.css';
import './index.html';
import mugImg from './img/mug1.png';
import LifeCircle from './lifecircle';
import { waitEvent } from './eventswork';

const scene = document.querySelector('#scene');

function moveAlong() {
  console.log('moved');
}

function takeABear() {
  console.log('mouse down');
}

const actors = {
  beerMugs: {
    spec: {
      tag: 'img',
    },

    style: {
      'image-rendering': 'pixelated',
    },

    species: {
      onLine: {
        behavior: {
          // onTick: moveAlong,

          onEvent: [
            {
              type: 'mousedown',
              action: takeABear,
            },
          ],
        },

        specimens: new Set([
          {
            attributes: {
              src: mugImg,
            },
            style: {
              width: '90px',
              height: '120px',
              left: '500px',
              top: '200px',
            },
          },
          {
            attributes: {
              src: mugImg,
            },
            style: {
              width: '90px',
              height: '120px',
              left: '400px',
              top: '200px',
            },
          },
          {
            attributes: {
              src: mugImg,
            },
            style: {
              width: '90px',
              height: '120px',
              left: '300px',
              top: '200px',
            },
          },
        ]),
      },
    },
  },
};

const mainLoop = new LifeCircle(scene, actors);

mainLoop();
