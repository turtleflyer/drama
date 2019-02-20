/* eslint-env browser */
import { debugFlags, debugKeys } from './debug_flags';
import debugPanel, { updateDebugPanelStatus } from './debugPanel/debugPanel';

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
    updateDebugPanelStatus();
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'Alt' || event.key === 'Control') {
    sequenceIndex = null;
  }
});

export default debugPanel;
