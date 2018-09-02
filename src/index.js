/* eslint-env browser */
import './styles.css';
import './index.html';
import {
  makeUnit,
  registerUnit,
  getRegisteredUnit,
  registerEventType,
  fireEvent,
  eventChain,
} from './eventswork';
import { setPosition } from './helperslib';
import { scene, beerBar, mechanism } from './maindescription';

function parseMainDescription(toParse, placeToAdd) {
  function parseDeep(part) {
    const { nested, className } = part;
    if (nested) {
      const unit = makeUnit(new Set());
      registerUnit(unit, className);
      part.nested.forEach((element) => {
        const elementToAdd = parseDeep(element);
        elementToAdd.className = className;
        unit.addElement(elementToAdd);
      });
      return unit;
    }
    if (part !== placeToAdd) {
      placeToAdd.appendChild(part);
    }
    return part;
  }
  parseDeep(toParse);
}

parseMainDescription(beerBar, scene);

// console.log('scene, beerBar, mechanism: ', scene, beerBar, mechanism);
// const f = mechanism.registerEvents.tick50.createAction;
// console.log('f: ', f);
Object.keys(mechanism.registerEvents).forEach(type => registerEventType(type));
let x = 10;
eventChain(
  {
    unit: getRegisteredUnit('beer-mug'),
    type: 'tick50',
    action: mechanism.registerEvents.tick50.createAction((data) => {
      // console.log(data);
      const { target, event } = data;
      let timeout = 0;
      if (event) {
        timeout = event.timeout;
        // console.log('timeout: ', timeout);
      }
      x += (timeout * 100) / 1000;
      // console.log('x: ', x);
      setPosition(target, { x });
      if (x > 600) {
        getRegiseredUnit('main').addElement(target);
      }
    }),
  },
  true,
);
// fireEvent([...allUnits['beer-mug']][0], 'tick50', {});
