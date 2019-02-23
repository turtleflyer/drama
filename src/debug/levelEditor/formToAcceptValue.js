/* eslint-env browser */
import './style.css';

export default function formToAcceptValue(name, valueKeeper) {
  const form = document.createElement('form');
  form.className = 'level-form';
  form.innerHTML = `
    <label>${name}&nbsp&nbsp</label>
    <input type="number" name="${name}" ${
  valueKeeper.value ? `value="${valueKeeper.value}"` : ''
} class="level-form__input">
  `;

  return form;
}
