/* eslint-env browser */
import { matrixContainer } from './matrix';
import { messageContainer } from './messages';
import restartButton from './restartButton';

const stageStyle = { 'line-height': '0' };
const stage = document.querySelector('#stage-tic-tac');
Object.assign(stage.style, stageStyle);

stage.appendChild(matrixContainer);
stage.appendChild(messageContainer);
stage.appendChild(restartButton);

export default stage;
