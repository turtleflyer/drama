/* eslint-env browser */
import { matrixContainer } from './matrix';
import { messageContainer } from './messages';
import restartButton from './restartButton';

export default function createStage() {
  const stageStyle = {
    'line-height': '0',
    'box-sizing': 'border-box',
  };
  const stage = document.createElement('div');
  Object.assign(stage.style, stageStyle);

  stage.appendChild(matrixContainer);
  stage.appendChild(messageContainer);
  stage.appendChild(restartButton);

  return stage;
}
