/* eslint-env browser */
import { waitGroupEvent } from './eventswork';

function initScene(scene, state) {
  const { attributes: attrTopLevel, style: styleTopLevel } = state;
  if (attrTopLevel) {
    Object.defineProperties(state, 'attribute', { enumerable: false });
  }
  if (styleTopLevel) {
    Object.defineProperties(state, 'style', { enumerable: false });
  }
  Object.values(state).forEach((actorsType) => {
    const {
      spec, species, attributes: attrTypeLevel, style: styleTypeLevel,
    } = actorsType;
    Object.values(species).forEach((inSpec) => {
      const { specimens, attributes: attrSpecLevel, style: styleSpecLevel } = inSpec;
      specimens.forEach((element) => {
        const node = document.createElement(spec.tag);
        node.style.position = 'absolute';
        Object.entries({
          ...attrTopLevel,
          ...attrTypeLevel,
          ...attrSpecLevel,
          ...element.attributes,
        }).forEach((attr) => {
          node.setAttribute(...attr);
        });
        Object.entries({
          ...element.style,
          ...styleTopLevel,
          ...styleTypeLevel,
          ...styleSpecLevel,
        }).forEach((attr) => {
          const [styleName, styleProp] = attr;
          node.style[styleName] = styleProp;
        });
        /* eslint-disable-next-line no-param-reassign */
        element.node = node;
        scene.appendChild(node);
      });
    });
  });
}

export default class Lifecicle {
  constructor(scene, state) {
    initScene(scene, state);

    // debug-block-start
    const {
      beerMugs: {
        species: {
          onLine: { specimens },
        },
      },
    } = state;
    console.log(specimens);
    const p = waitGroupEvent([...specimens].map(s => s.node), { type: 'mousedown', id: 1 });
    console.log('p: ', p);
    p.then(console.log);
    // debug-block-end

    return function () {
      console.log(scene);
      console.log(state);
    };
  }
}
