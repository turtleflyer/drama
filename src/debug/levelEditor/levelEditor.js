/* eslint-env browser */
import '../style.css';
import { createObjStructureImage } from './levelEditor_lib';
import formToAcceptValue from './formToAcceptValue';
import faucetsRelatedForm from './faucetsRelatedForm';

const levelEditor = document.createElement('div');
levelEditor.className = 'tab-panel';

let state;

export function initializeLevelEditor(levelDescription) {
  levelEditor.innerHTML = '';
  state = createObjStructureImage(levelDescription);

  const { params: levelParams } = state;

  const mugSpeedInput = formToAcceptValue('Mugs Speed', levelParams.mugsSpeed);
  levelEditor.appendChild(mugSpeedInput);

  const initMugDensity = formToAcceptValue('Init Mug Density', levelParams.initMugDensity);
  levelEditor.appendChild(initMugDensity);

  const remainingTime = formToAcceptValue('Remaining Time', levelParams.remainingTime);
  levelEditor.appendChild(remainingTime);

  const moneyToEarn = formToAcceptValue('Money To Earn', levelParams.moneyToEarn);
  levelEditor.appendChild(moneyToEarn);
  levelEditor.appendChild(document.createElement('br'));

  console.log('levelParams: ', levelParams);
  const faucetsCheckBoxes = faucetsRelatedForm(levelParams.faucetsDescription.models);
  levelEditor.appendChild(faucetsCheckBoxes);
}

export default levelEditor;
