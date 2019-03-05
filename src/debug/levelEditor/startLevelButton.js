/* eslint-env browser */
import { revertToOriginalStructure } from './levelEditor_lib';
import { getStarter } from './levelRunnerWrapper';

const state = {};

const startButton = document.createElement('button');
startButton.className = 'debug-panel-button';
startButton.innerText = 'Start level';

startButton.addEventListener('click', () => {
  const descriptionToCopy = revertToOriginalStructure(state.levelParams);
  getStarter()(descriptionToCopy);
});

export default function startLevelButton(levelParams) {
  state.levelParams = levelParams;
  return startButton;
}
