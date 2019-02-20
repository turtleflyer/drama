/* eslint-env browser */
import './tabs.css';
import debugPanel from './debugPanel/debugPanel';
import { debugFlags, debugKeys } from './debug_flags';
import levelEditor from './levelEditor/levelEditor';

const tabsWrapper = document.createElement('div');
const debugPanelTab = document.createElement('div');
debugPanelTab.innerText = 'Debug Panel';
debugPanelTab.classList.add('tab-head', 'tab-head--selected');
const levelEditorTab = document.createElement('div');
levelEditorTab.innerText = 'Level Editor';
levelEditorTab.className = 'tab-head';
tabsWrapper.appendChild(debugPanelTab);
tabsWrapper.appendChild(levelEditorTab);

const panels = [debugPanel, levelEditor];
const tabs = [debugPanelTab, levelEditorTab];

tabsWrapper.appendChild(debugPanel);

function tabPicker({ target }) {
  target.classList.add('tab-head--selected');
  tabs.forEach((e, i) => {
    if (e !== target) {
      e.classList.remove('tab-head--selected');
      panels[i].remove();
    } else {
      tabsWrapper.appendChild(panels[i]);
    }
  });
}

debugPanelTab.addEventListener('mousedown', tabPicker);
levelEditorTab.addEventListener('mousedown', tabPicker);

// eslint-disable-next-line
export function updateDebugPanelStatus() {
  if (debugFlags[debugKeys.SHOW_DEBUG_PANEL]) {
    document.querySelector('body').appendChild(tabsWrapper);
  } else {
    tabsWrapper.remove();
  }
}
