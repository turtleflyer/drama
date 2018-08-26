/* eslint-env browser */
import EventsWork from './eventswork';

const { makeUnit, eventChain } = new EventsWork();

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
    const b1 = {
      unit: makeUnit([...specimens].map(s => s.node)),
      type: 'mousedown',
      action: (data, description) => {
        const { target } = data;
        const { unit } = description;
        console.log(data);
        target.style.top = `${Number(target.style.top.replace(/px/, '')) + 10}px`;
        unit.deleteElement(target);
        b2.unit.addElement(target);
        console.log('b2: ', b2);
      },
    };
    eventChain(b1);
    const b2 = {
      unit: makeUnit([]),
      type: 'mousemove',
      action: (data, description) => {
        const { target, event } = data;
        console.log(target.x, target.y);
        console.log(data);
        console.log(event);
      },
    };
    eventChain(b2);
    // debug-block-end

    return function () {
      console.log(scene);
      console.log(state);
    };
  }
}
