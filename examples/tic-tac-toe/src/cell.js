/* eslint-env browser */

const cellStyle = {
  border: '1px solid black',
  width: '3em',
  height: '3em',
  position: 'relative',
  display: 'inline-block',
  'background-color': 'white',
};
const markAsWinStyle = { 'background-color': 'Khaki' };

export function resetCell() {
  while (this.node.firstChild) {
    this.node.removeChild(this.node.firstChild);
  }
  Object.assign(this.node.style, cellStyle);
  return this;
}

export function setX() {
  const commonStyle = {
    position: 'absolute',
    left: '-0.24em',
    top: '1.24em',
    width: '3em',
    height: '0',
    border: '0.3em solid RoyalBlue',
    margin: '0',
    'border-radius': '0.3em',
  };
  const first = document.createElement('div');
  const second = document.createElement('div');
  Object.assign(first.style, commonStyle, { transform: 'rotate(45deg)' });
  Object.assign(second.style, commonStyle, { transform: 'rotate(135deg)' });
  this.resetCell();
  this.node.appendChild(first);
  this.node.appendChild(second);
  return this;
}

export function setO() {
  const o = document.createElement('div');
  const oStyle = {
    position: 'absolute',
    left: '0.15em',
    top: '0.15em',
    width: '1.5em',
    height: '1.5em',
    border: '0.6em solid Red',
    margin: '0',
    'border-radius': '2.1em',
  };
  Object.assign(o.style, oStyle);
  this.resetCell();
  this.node.appendChild(o);
  return this;
}

export function markAsWin() {
  Object.assign(this.node.style, markAsWinStyle);
}

export function createCell() {
  const cell = document.createElement('div');
  Object.assign(cell.style, cellStyle);
  return cell;
}
