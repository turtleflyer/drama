/* eslint-env browser */
import stage from '../../stage/stage';

const pauseButton = document.createElement('button');
Object.assign(pauseButton.style, { width: '100px', height: '20px', margin: '5px' });
pauseButton.innerText = 'pause';
pauseButton.addEventListener('click', () => {
  if (stage.state.paused) {
    stage.resume();
  } else {
    stage.pause();
  }
});

export default pauseButton;
