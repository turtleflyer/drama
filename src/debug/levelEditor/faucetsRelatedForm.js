/* eslint-env browser */
import './style.css';
import { faucetModels } from '../../screens/gameplay/role_sets/faucets/faucets_params';

function createCheckBox(name) {
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.name = name;
  checkBox.innerText = name;
  checkBox.className = 'faucet-checkbox';
  return checkBox;
}

export const faucetModelKey = Symbol('faucetModelKey');

export default function faucetsRelatedForm(valueKeeper) {
  const checkBoxes = [];
  const form = document.createElement('div');
  form.className = 'level-form';
  Object.entries(faucetModels).forEach(([k, f]) => {
    const cb = createCheckBox(k);
    cb.checked = valueKeeper.value.includes(f);
    cb[faucetModelKey] = k;
    checkBoxes.push(cb);
    form.appendChild(cb);
    form.appendChild(document.createTextNode(`${cb.name}\u00A0\u00A0`));
  });

  return {
    form,
    checkBoxes,
    checkState(key, check = true) {
      if (check) {
        valueKeeper.value.push(faucetModels[key]);
      } else {
        valueKeeper.value = valueKeeper.value.filter(f => f !== faucetModels[key]);
      }
    },
  };
}
