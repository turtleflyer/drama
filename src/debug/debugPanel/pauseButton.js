/* eslint-env browser */
import stage from '../../stage/stage';

const pauseButton = document.createElement('button');
Object.assign(pauseButton.style, { width: '100px', height: '20px', margin: '5px' });
pauseButton.innerText = 'pause';
pauseButton.addEventListener('click', () => {
  stage.state.paused = !stage.state.paused;
});

export default pauseButton;
