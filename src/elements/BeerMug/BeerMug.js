import { appendPx, makeScalable } from '../../gamelabrary';
import mugImg from './mug1.png';

const BeerMug = {
  render: function BeerMug(left, top, width, height, scaleF) {
    const div = makeScalable(document.createElement('div'));
    div.setSizePos({
      left,
      top,
      width,
      height,
    });
    const img = document.createElement('img');
    img.src = mugImg;
    img.style.width = '100%';
    div.appendChild(img);
    return div;
  },
};

export default BeerMug;
