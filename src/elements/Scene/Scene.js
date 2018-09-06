/* eslint-env browser */
import {
  GameActor, appendPx, makeScalable, setOrigin, parseDescription,
} from '../../gamelabrary';
import {
  makeUnit, registerEventType, fireEvent, eventChain,
} from '../../eventswork';

export default parseDescription({
  Scene: {
    name: 'Scene',
    nested(toolkit) {
      return [new GameActor(document.querySelector('#scene')), toolkit.getUnit('BeerMug')];
    },
  },
});
