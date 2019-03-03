/* eslint-env browser */
import '../styles.css';
import { createObjStructureImage } from './levelEditor_lib';
import formToAcceptValue from './formToAcceptValue';
import faucetsRelatedForm from './faucetsRelatedForm';
import mugsDistributionForm from './mugsDistributionForm';
import formsSet from './formSet';
import copyButton from './copyButton';

const levelEditor = document.createElement('div');
levelEditor.className = 'tab-panel';

const state = {};

export function initializeLevelEditor(levelDescription) {
  levelEditor.innerHTML = '';
  state.levelEdit = createObjStructureImage(levelDescription);

  const {
    levelEdit,
    levelEdit: {
      params: {
        mugsSpeed,
        initMugDensity,
        remainingTime,
        moneyToEarn,
        mugsDistribution,
        faucetsDescription: { models: faucets },
      },
      initState: { money: initMoney },
    },
  } = state;

  const mugSpeedInputForm = formToAcceptValue('Mugs Speed', mugsSpeed, 'value');
  levelEditor.appendChild(mugSpeedInputForm.form);

  const initMugDensityForm = formToAcceptValue('Init Mug Density', initMugDensity, 'value');
  levelEditor.appendChild(initMugDensityForm.form);

  const remainingTimeForm = formToAcceptValue('Remaining Time', remainingTime, 'value');
  levelEditor.appendChild(remainingTimeForm.form);

  const moneyToEarnForm = formToAcceptValue('Money To Earn', moneyToEarn, 'value');
  levelEditor.appendChild(moneyToEarnForm.form);

  const initMoneyForm = formToAcceptValue('Money in Beginning', initMoney, 'value');
  levelEditor.appendChild(initMoneyForm.form);
  levelEditor.appendChild(document.createElement('br'));

  const faucetsCheckBoxesForm = faucetsRelatedForm(faucets);
  levelEditor.appendChild(faucetsCheckBoxesForm.form);
  levelEditor.appendChild(document.createElement('br'));

  const mugsDistrForm = mugsDistributionForm(mugsDistribution);
  levelEditor.appendChild(mugsDistrForm.form);
  levelEditor.appendChild(document.createElement('br'));

  levelEditor.appendChild(copyButton(levelEdit));

  formsSet.clearElements();
  formsSet.addElements([
    mugSpeedInputForm,
    initMugDensityForm,
    remainingTimeForm,
    moneyToEarnForm,
    initMoneyForm,
    faucetsCheckBoxesForm,
  ]);
  formsSet.addElements(mugsDistrForm.mugForms);
}

export default levelEditor;
