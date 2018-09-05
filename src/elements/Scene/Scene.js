/* eslint-env browser */
import BeerMug from '../BeerMug/BeerMug';
import {
  registeredUnites,
  appendPx,
  makeScalable,
  setOrigin,
  parseDescription,
} from '../../gamelabrary';
import {
  makeUnit,
  registerUnit,
  getRegisteredUnit,
  registerEventType,
  fireEvent,
  eventChain,
} from '../../eventswork';

const Scene = {
  name: 'Scene',
  render: () => document.querySelector('#scene'),
  nested: () => [Scene.render(), registeredUnites.BeerMug],

};

export default Scene;
