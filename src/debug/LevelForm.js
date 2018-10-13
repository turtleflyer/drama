/* eslint-env browser */
import { parseDescription, GameActor, getUnit } from '../gamelibrary';
import { fireEvent } from '../eventswork';
import { startLevel } from '../start';

document
  .querySelector('body')
  .insertAdjacentHTML(
    'beforeend',
    '<form style="margin: 10px"  id="LevelForm"><input type="text" name="level"><input type="submit" value="Submit"></form>',
  );

export default parseDescription({
  LevelForm: {
    nested() {
      const form = new GameActor(document.querySelector('#LevelForm'));
      return [form];
    },

    mechanism: {
      submitLevel: {
        type: 'submit',
        action({ event }) {
          event.preventDefault();
          const level = Number(event.srcElement[0].value);
          fireEvent(getUnit('AllUnits'), 'stop');
          window.setTimeout(() => {
            startLevel(level || 0);
            console.log("'getUnit('AllUnits'): '", getUnit('AllUnits'));
            console.log("'getUnit('FaucetSwitches'): '", getUnit('FaucetSwitches'));
          }, 1000);
        },
      },
    },
  },
});
