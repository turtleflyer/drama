/* eslint-env browser */
import { startLevel } from '../stage/level_starter';
import { setD, updateDebugInfo } from './setD';
import stage from '../stage/stage';
import { ActorsSet } from '../libs/actors_and_roles';

const levelForm = document.createElement('form');
levelForm.style.margin = '2px 10px';

levelForm.innerHTML = `
  <label>Level&nbsp&nbsp</label>
  <input type="number" name="level" value="0" style="width: 70px; height: 20px; margin-right: 10px">
  <input type="submit" value="Submit" style="height: 25px">
`;

levelForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const level = Number(event.target[0].value);
  startLevel(level);
});

export default levelForm;

const formSet = new ActorsSet([levelForm]);
formSet.name = 'formSet';
setD.addElement(formSet);

updateDebugInfo
  .registerAction(formSet, {
    action({ event: { updateLevel } }) {
      if (updateLevel) {
        levelForm.querySelector('input[type="number"').value = stage.state.level;
      }
    },
  })
  .start();
