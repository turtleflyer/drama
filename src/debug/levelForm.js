/* eslint-env browser */
import { startLevel } from '../stage/level_starter';

const levelForm = document.createElement('form');
levelForm.style.margin = '10px';

levelForm.innerHTML = `
  <input type="number" name="level" value="0" style="width: 70px; height: 20px; margin-right: 10px">
  <input type="submit" value="Submit" style="height: 25px">
`;

levelForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const level = Number(event.target[0].value);
  startLevel(level);
});

export default levelForm;
// window.setTimeout(() => {
//   LevelForm.querySelector('input[type="number"').value = stage.state.level;
// }, 2000);
