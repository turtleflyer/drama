/* eslint-env browser */
import '../styles.css';
import { createObjStructureImage } from './levelEditor_lib';
import formToAcceptValue from './formToAcceptValue';
import faucetsRelatedForm from './faucetsRelatedForm';
import mugsDistributionForm from './mugsDistributionForm';
import formsSet from './formSet';

const levelEditor = document.createElement('div');
levelEditor.className = 'tab-panel';

let state;

export function initializeLevelEditor(levelDescription) {
  levelEditor.innerHTML = '';
  state = createObjStructureImage(levelDescription);

  const { params: levelParams, initState } = state;

  const mugSpeedInput = formToAcceptValue('Mugs Speed', levelParams.mugsSpeed, 'value');
  levelEditor.appendChild(mugSpeedInput.form);

  const initMugDensity = formToAcceptValue('Init Mug Density', levelParams.initMugDensity, 'value');
  levelEditor.appendChild(initMugDensity.form);

  const remainingTime = formToAcceptValue('Remaining Time', levelParams.remainingTime, 'value');
  levelEditor.appendChild(remainingTime.form);

  const moneyToEarn = formToAcceptValue('Money To Earn', levelParams.moneyToEarn, 'value');
  levelEditor.appendChild(moneyToEarn.form);

  const initMoney = formToAcceptValue('Money in Beginning', initState.money, 'value');
  levelEditor.appendChild(initMoney.form);
  levelEditor.appendChild(document.createElement('br'));

  const faucetsCheckBoxes = faucetsRelatedForm(levelParams.faucetsDescription.models);
  levelEditor.appendChild(faucetsCheckBoxes.form);
  levelEditor.appendChild(document.createElement('br'));

  const mugsDistribution = mugsDistributionForm(levelParams.mugsDistribution);
  levelEditor.appendChild(mugsDistribution.form);

  formsSet.clearElements();
  formsSet.addElements([
    mugSpeedInput,
    initMugDensity,
    remainingTime,
    moneyToEarn,
    initMoney,
    faucetsCheckBoxes,
  ]);
  formsSet.addElements(mugsDistribution.mugForms);
}

export default levelEditor;
