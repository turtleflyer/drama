/* eslint-env browser */
import { debugFlags, debugKeys } from '../debug_flags';
import { highlightPlacesRole } from '../../screens/gameplay/supersets/dropPlaces';
import { highlightHandlesRole } from '../../screens/gameplay/role_sets/faucetHandles/faucetHandles';

const highlightZonesCheck = document.createElement('form');

highlightZonesCheck.innerHTML = `
    <input type="checkbox" name="highlight-drop-zones">
      Highlight drop zones
    </input>
`;

highlightZonesCheck.querySelector('input').onchange = function (e) {
  debugFlags[debugKeys.HIGHLIGHT_DROP_ZONES] = e.target.checked;
  highlightPlacesRole.fire();
  highlightHandlesRole.fire();
};

export default highlightZonesCheck;
