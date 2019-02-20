/* eslint-env browser */
import stopButton from './stopButton';
import levelForm from './levelForm';
import displayInfo from './displayInfo';
import fpsInfo from './fpsInfo';
import resultButton from './resultButton';
import highlightZonesCheck from './highlightZonesCheck';
import { debugFlags, debugKeys } from '../debug_flags';
import pauseButton from './pauseButton';
import './debugPanel.css';

const debugPanel = document.createElement('div');
debugPanel.className = 'tab-panel';
debugPanel.appendChild(displayInfo);
debugPanel.appendChild(fpsInfo);
debugPanel.appendChild(highlightZonesCheck);

const wrapDiv = document.createElement('div');
debugPanel.appendChild(wrapDiv);
wrapDiv.appendChild(stopButton);
wrapDiv.appendChild(pauseButton);

debugPanel.appendChild(levelForm);
debugPanel.appendChild(resultButton);

const debugKeysSequence = ['d', 'e', 'b', 'u', 'g'];
let sequenceIndex = null;
window.addEventListener('keydown', (event) => {
  if ((event.key === 'Alt' && event.ctrlKey) || (event.key === 'Control' && event.altKey)) {
    sequenceIndex = 0;
  }
  if (sequenceIndex >= 0 && event.key === debugKeysSequence[sequenceIndex]) {
    sequenceIndex++;
  }
  if (sequenceIndex === debugKeysSequence.length) {
    debugFlags[debugKeys.SHOW_DEBUG_PANEL] = !debugFlags[debugKeys.SHOW_DEBUG_PANEL];
    if (debugFlags[debugKeys.SHOW_DEBUG_PANEL]) {
      document.querySelector('body').appendChild(debugPanel);
    } else {
      debugPanel.remove();
    }
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'Alt' || event.key === 'Control') {
    sequenceIndex = null;
  }
});

export default debugPanel;

export function updateDebugPanelStatus() {
  if (debugFlags[debugKeys.SHOW_DEBUG_PANEL]) {
    document.querySelector('body').appendChild(debugPanel);
  }
}
