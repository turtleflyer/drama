/* eslint-env browser */

const buttonStyle = {
  width: '7em',
  height: '2em',
};
const restartButton = document.createElement('button');
restartButton.innerText = 'Restart';
Object.assign(restartButton.style, buttonStyle);

export default restartButton;
