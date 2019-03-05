/* eslint-env browser */
import debugFlags from './debug_flags';
import { updateDebugPanelStatus } from './tabsWrapper';

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
    debugFlags.SHOW_DEBUG_PANEL = !debugFlags.SHOW_DEBUG_PANEL;
    updateDebugPanelStatus();
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'Alt' || event.key === 'Control') {
    sequenceIndex = null;
  }
});
