/* eslint-env browser */

const buttonStyle = {
  width: '7rem',
  height: '2rem',
};
const restartButton = document.createElement('button');
restartButton.innerText = 'Restart';
Object.assign(restartButton.style, buttonStyle);

export default restartButton;
