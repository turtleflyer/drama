/* eslint-env browser */
import './style.css';
import { faucetModels, switchTypes } from '../../screens/gameplay/role_sets/faucets/faucets_params';
import { formTypes } from './formSet';

function createCheckBox(name) {
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.name = name;
  checkBox.innerText = name;
  checkBox.className = 'faucet-checkbox';
  return checkBox;
}

export default function faucetsRelatedForm(valueKeeper) {
  const checkBoxesMap = new Map();
  const form = document.createElement('div');
  form.className = 'level-form';
  Object.entries(faucetModels).forEach(([k, f]) => {
    const cb = createCheckBox(k);
    cb.checked = valueKeeper.value.includes(f);
    checkBoxesMap.set(k, cb);
    form.appendChild(cb);
    form.appendChild(document.createTextNode(`${cb.name}\u00A0\u00A0`));
  });

  return {
    form,
    checkBoxes: checkBoxesMap.values(),
    checkState(key, check = true) {
      if (check) {
        const { value: recentValue } = valueKeeper;
        const faucetToAdd = faucetModels[key];
        if (
          recentValue.length === 3
          || (recentValue.length === 2
            && (faucetToAdd.switchType === switchTypes.DUAL
              || recentValue.filter(f => f.switchType === switchTypes.DUAL).length >= 1))
        ) {
          checkBoxesMap.get(key).checked = false;
        } else {
          recentValue.push(faucetToAdd);
        }
      } else {
        valueKeeper.value = valueKeeper.value.filter(f => f !== faucetModels[key]);
      }
    },
    type: formTypes.FAUCETS_RELATED_FORM,
  };
}
