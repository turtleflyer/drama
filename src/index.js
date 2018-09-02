/* eslint-env browser */
import './styles.css';
import './index.html';
import { setPosition } from './helperslib';
import {
  scene, beerBar, mechanism, eventWorker,
} from './maindescription';

const {
  makeUnit, registerEventType, fireEvent, eventChain,
} = eventWorker;

function parseMainDescription(toParse, placeToAdd) {
  const units = {};
  function parseDeep(part) {
    const { nested, className } = part;
    if (nested) {
      const unit = makeUnit(new Set());
      units[className] = unit;
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
  return units;
}

const allUnits = parseMainDescription(beerBar, scene);

// console.log('scene, beerBar, mechanism: ', scene, beerBar, mechanism);
// const f = mechanism.registerEvents.tick50.createAction;
// console.log('f: ', f);
Object.keys(mechanism.registerEvents).forEach(type => registerEventType(type));
let x = 10;
eventChain(
  {
    unit: allUnits['beer-mug'],
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
        allUnits.main.addElement(target);
      }
    }),
  },
  true,
);
// fireEvent([...allUnits['beer-mug']][0], 'tick50', {});
