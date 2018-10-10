/* eslint-env browser */
import { parseDescription, GameActor, getUnit } from '../gamelibrary';
import { fireEvent } from '../eventswork';

export default parseDescription({
  StopButton: {
    nested() {
      const button = document.createElement('button');
      document.querySelector('body').appendChild(button);
      button.style.margin = '10px';
      button.innerText = 'stop';
      return [new GameActor(button, { width: 100, height: 50 })];
    },

    mechanism: {
      pushButton: {
        type: 'click',
        action() {
          fireEvent(getUnit('AllUnits'), 'stop');
        },
      },
    },
  },
});
