/* eslint-env browser */
import { revertToOriginalStructure } from './levelEditor_lib';
import { faucetModels } from '../../screens/gameplay/role_sets/faucets/faucets_params';
import { mugsTypes } from './mugsDistributionForm';

const state = {};

const copyButtonWrapper = document.createElement('div');
copyButtonWrapper.className = 'copy-alert-text';
const copyParamsButton = document.createElement('button');
copyParamsButton.className = 'debug-panel-button';
copyParamsButton.innerText = 'Copy params';
copyButtonWrapper.appendChild(copyParamsButton);

copyParamsButton.addEventListener('click', () => {
  const descriptionToCopy = revertToOriginalStructure(state.levelParams);
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

export default function copyButton(levelParams) {
  state.levelParams = levelParams;
  return copyButtonWrapper;
}
