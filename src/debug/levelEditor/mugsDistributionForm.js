/* eslint-env browser */
import './style.css';
import { beerTypes } from '../../stage/gameplay_params';
import formToAcceptValue from './formToAcceptValue';

export default function mugsDistributionForm(valueKeeper) {
  const mugForms = [];
  const form = document.createElement('div');
  form.appendChild(document.createTextNode('Mugs distribution:\u00A0\u00A0'));
  form.className = 'level-form';
  Object.entries(beerTypes).forEach(([beerType, beerTypeSymbol]) => {
    const mug = formToAcceptValue(beerType, valueKeeper.value, beerTypeSymbol);
    mugForms.push(mug);
    form.appendChild(mug.form);
  });

  return {
    form,
    mugForms,
  };
}
