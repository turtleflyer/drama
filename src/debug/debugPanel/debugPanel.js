/* eslint-env browser */
import stopButton from './stopButton';
import levelForm from './levelForm';
import displayInfo from './displayInfo';
import fpsInfo from './fpsInfo';
import resultButton from './resultButton';
import highlightZonesCheck from './highlightZonesCheck';
import pauseButton from './pauseButton';
import '../styles.css';

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
