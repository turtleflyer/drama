/* eslint-env browser */
import { ActorsSet, registerActionOfType } from '../libs/actors_and_roles';
import { startStopLevel } from '../roles_manipulators';
import { startLevel } from '../stage/level_starter';

document
  .querySelector('body')
  .insertAdjacentHTML(
    'beforeend',
    '<form style="margin: 10px" id="LevelForm"><input type="number" name="level" value="0" style="width: 70px; height: 20px; margin-right: 10px"><input type="submit" value="Submit" style="height: 25px"></form>',
  );

const form = document.querySelector('#LevelForm');

const stopButton = new ActorsSet([{ node: form }]);

registerActionOfType('submit', stopButton, {
  action({ event }) {
    event.preventDefault();
    const level = Number(event.srcElement[0].value);
    startStopLevel.stop();
    startLevel(level);
  },
}).start();
