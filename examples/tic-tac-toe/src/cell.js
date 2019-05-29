/* eslint-env browser */

const cellStyle = {
  border: '1px solid black',
  width: '3rem',
  height: '3rem',
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

export function markX() {
  const commonStyle = {
    position: 'absolute',
    left: '-0.24rem',
    top: '1.24rem',
    width: '3rem',
    height: '0',
    border: '0.3rem solid RoyalBlue',
    backgroundColor: 'RoyalBlue',
    margin: '0',
    'border-radius': '0.3rem',
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

export function markO() {
  const o = document.createElement('div');
  const oStyle = {
    position: 'absolute',
    left: '0.15rem',
    top: '0.15rem',
    width: '1.5rem',
    height: '1.5rem',
    border: '0.6rem solid Red',
    margin: '0',
    'border-radius': '2.1rem',
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
