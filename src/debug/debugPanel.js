/* eslint-env browser */
import stopButton from './stopButton';
import levelForm from './levelForm';
import { displayInfo } from './displayInfo';
import { fpsInfo } from './fpsInfo';
import resultButton from './resultButton';
import highlightZonesCheck from './highlightZonesCheck';

const debugPanel = document.createElement('div');
debugPanel.appendChild(displayInfo);
debugPanel.appendChild(fpsInfo);
debugPanel.appendChild(stopButton);
debugPanel.appendChild(levelForm);
debugPanel.appendChild(resultButton);
debugPanel.appendChild(highlightZonesCheck);
document.querySelector('body').appendChild(debugPanel);

export default debugPanel;
