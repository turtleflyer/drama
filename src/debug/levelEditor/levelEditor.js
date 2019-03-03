/* eslint-env browser */
import '../styles.css';
import { createObjStructureImage, revertToOriginalStructure } from './levelEditor_lib';
import formToAcceptValue from './formToAcceptValue';
import faucetsRelatedForm from './faucetsRelatedForm';
import mugsDistributionForm, { mugsTypes } from './mugsDistributionForm';
import formsSet from './formSet';
import { faucetModels } from '../../screens/gameplay/role_sets/faucets/faucets_params';

const levelEditor = document.createElement('div');
levelEditor.className = 'tab-panel';

const state = {};

const copyButtonWrapper = document.createElement('div');
copyButtonWrapper.className = 'copy-alert-text';
const copyParamsButton = document.createElement('button');
copyParamsButton.className = 'debug-panel-button';
copyParamsButton.innerText = 'Copy params';
copyButtonWrapper.appendChild(copyParamsButton);

copyParamsButton.addEventListener('click', () => {
  const descriptionToCopy = revertToOriginalStructure(state.levelEdit);
  const {
    params: {
      faucetsDescription: { models },
      mugsDistribution,
    },
  } = descriptionToCopy;
  descriptionToCopy.params.faucetsDescription.models = models.map(
    f => `faucetModels.${Object.entries(faucetModels).filter(entr => f === entr[1])[0][0]}`,
  );

  descriptionToCopy.params.mugsDistribution = Object.entries(mugsDistribution).reduce(
    (r, [k, v]) => {
      r[`[${Object.entries(mugsTypes).filter(entr => k === entr[1])[0][0]}]`] = v;
      return r;
    },
    {},
  );

  const stringToCopy = JSON.stringify(descriptionToCopy, null, 2).replace(/"/g, '');
  navigator.clipboard
    .writeText(stringToCopy)
    .then(() => {
      const text = document.createTextNode('Parameters copied');
      copyButtonWrapper.appendChild(text);
      return new Promise((resolve) => {
        window.setTimeout(() => resolve(text), 2000);
      });
    })
    .then(text => text.remove());
});

export function initializeLevelEditor(levelDescription) {
  levelEditor.innerHTML = '';
  state.levelEdit = createObjStructureImage(levelDescription);

  const {
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

  levelEditor.appendChild(copyButtonWrapper);

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
