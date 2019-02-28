/* eslint-env browser */
import '../styles.css';
import { createObjStructureImage, revertToOriginalStructure } from './levelEditor_lib';
import formToAcceptValue from './formToAcceptValue';
import faucetsRelatedForm from './faucetsRelatedForm';
import mugsDistributionForm from './mugsDistributionForm';
import formsSet from './formSet';
import { faucetModels } from '../../screens/gameplay/role_sets/faucets/faucets_params';
import { beerTypes } from '../../stage/gameplay_params';

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

  const mugsDistr = mugsDistributionForm(levelParams.mugsDistribution);
  levelEditor.appendChild(mugsDistr.form);
  levelEditor.appendChild(document.createElement('br'));

  formsSet.clearElements();
  formsSet.addElements([
    mugSpeedInput,
    initMugDensity,
    remainingTime,
    moneyToEarn,
    initMoney,
    faucetsCheckBoxes,
  ]);
  formsSet.addElements(mugsDistr.mugForms);

  const copyButtonWrapper = document.createElement('div');
  copyButtonWrapper.className = 'copy-alert-text';
  const copyParamsButton = document.createElement('button');
  copyParamsButton.className = 'debug-panel-button';
  copyParamsButton.innerText = 'Copy params';
  levelEditor.appendChild(copyButtonWrapper);
  copyButtonWrapper.appendChild(copyParamsButton);

  copyParamsButton.addEventListener('click', () => {
    const descriptionToCopy = revertToOriginalStructure(state);
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
        r[`[beerTypes.${Object.entries(beerTypes).filter(entr => k === entr[1])[0][0]}]`] = v;
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
}

export default levelEditor;
