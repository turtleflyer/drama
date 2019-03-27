/* eslint-env browser */
import { matrixContainer } from './matrix';
import { messageContainer } from './messages';
import restartButton from './restartButton';

export default function createStage(placeholder) {
  const stageStyle = { 'line-height': '0', 'box-sizing': 'content-box' };
  const stage = document.createElement('div');
  Object.assign(stage.style, stageStyle);

  stage.appendChild(matrixContainer);
  stage.appendChild(messageContainer);
  stage.appendChild(restartButton);

  placeholder.parentNode.replaceChild(stage, placeholder);

  return stage;
}
