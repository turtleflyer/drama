/* eslint-env browser */
import './styles.css';
import { beerTypes, glassType } from '../../stage/gameplay_params';
import formToAcceptValue from './formToAcceptValue';

export const mugsTypes = {
  ...Object.entries(beerTypes).reduce((obj, [k, v]) => ({ ...obj, [`beerTypes.${k}`]: v }), {}),
  glassType,
};

export default function mugsDistributionForm(valueKeeper) {
  const mugForms = [];
  const form = document.createElement('div');
  form.appendChild(document.createTextNode('Mugs distribution:\u00A0\u00A0'));
  form.className = 'level-form';
  Object.entries(mugsTypes).forEach(([beerType, beerTypeSymbol]) => {
    const mug = formToAcceptValue(beerType, valueKeeper.value, beerTypeSymbol);
    mugForms.push(mug);
    form.appendChild(mug.form);
  });

  return {
    form,
    mugForms,
  };
}
