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

export default debugPanel;

export function updateDebugPanelStatus() {
  if (debugFlags[debugKeys.SHOW_DEBUG_PANEL]) {
    document.querySelector('body').appendChild(debugPanel);
  } else {
    debugPanel.remove();
  }
}
