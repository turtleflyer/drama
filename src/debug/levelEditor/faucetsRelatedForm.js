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

const checkBoxes = [];
export default function faucetsRelatedForm(valueKeeper) {
  console.log('valueKeeper: ', valueKeeper);
  const form = document.createElement('div');
  form.className = 'level-form';
  checkBoxes.length = 0;
  Object.entries(faucetModels).forEach(([k, f]) => {
    const cb = createCheckBox(k);
    cb.checked = valueKeeper.value.includes(f);
    checkBoxes.push(cb);
    form.appendChild(cb);
    form.appendChild(document.createTextNode(`${cb.name}\u00A0\u00A0`));
  });

  return form;
}
