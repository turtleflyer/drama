/* eslint-env browser */
import stage from '../../stage/stage';
import '../styles.css';

const pauseButton = document.createElement('button');
pauseButton.className = 'debug-panel-button';
pauseButton.innerText = 'pause';
pauseButton.addEventListener('click', () => {
  if (stage.state.paused) {
    stage.resume();
  } else {
    stage.pause();
  }
});

export default pauseButton;
