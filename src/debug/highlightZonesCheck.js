/* eslint-env browser */
import { debugFlags, debugKeys } from './debug_flags';
import { highlightPlacesRole } from '../screens/gameplay/supersets/dropPlaces';
import { highlightHandlesRole } from '../screens/gameplay/role_sets/faucetHandles/faucetHandles';

document.querySelector('body').insertAdjacentHTML(
  'beforeend',
  `<form>
    <input type="checkbox" name="highlight-drop-zones">
      Highlight drop zones
    </input>
  </form>`,
);

document.querySelector('input[name="highlight-drop-zones"]').onchange = function (e) {
  debugFlags[debugKeys.HIGHLIGHT_DROP_ZONES] = e.target.checked;
  highlightPlacesRole.fire();
  highlightHandlesRole.fire();
};
