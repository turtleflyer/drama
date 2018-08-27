/* eslint-env browser */
import { setPosition } from './helperslib';
import EventsWork from './eventswork';
import mugImg from './img/mug1.png';

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
    // console.log(specimens);
    // const b1 = {
    //   unit: makeUnit([...specimens].map(s => s.node)),
    //   type: 'mousedown',
    //   action: (data, description) => {
    //     const { target } = data;
    //     const { unit } = description;
    //     // console.log(data);
    //     target.style.top = `${Number(target.style.top.replace(/px/, '')) + 10}px`;
    //     b2.unit.addElement(target);
    //     // console.log('b2: ', b2);
    //   },
    // };
    [...specimens][0].node.alt = 'parent';
    [...specimens][1].node.alt = 'child';
    const b1 = {
      unit: makeUnit([[...specimens][0].node]),
      type: 'mousedown',
      action: (data, description) => {
        const { target } = data;
        const { unit } = description;
        // console.log(data);
        target.style.top = `${Number(target.style.top.replace(/px/, '')) + 10}px`;
        b2.unit.addElement(target);
        // console.log('b2: ', b2);
      },
    };
    const u = makeUnit([[...specimens][1].node]);
    eventChain(b1);
    b1.unit.addElement(u);
    const b2 = {
      unit: makeUnit([]),
      type: 'mousemove',
      action: (data, description) => {
        const { target, event } = data;
        // console.log(target.x, target.y);
        // console.log('event.clientX: ', event.clientX, 'event.clientY: ', event.clientY);
        // console.log(
        //   'target.getBoundingClientRect().x: ',
        //   target.getBoundingClientRect().x,
        //   'target.getBoundingClientRect().y: ',
        //   target.getBoundingClientRect().y,
        // );
        // console.log(
        //   'target.offsetLeft: ',
        //   target.offsetLeft,
        //   'target.offsetTop: ',
        //   target.offsetTop,
        // );
        // console.log(
        //   'target.style.left: ',
        //   target.style.left,
        //   'target.style.top: ',
        //   target.style.top,
        // );
        // console.log(data);
        // console.log(event);
        setPosition(target, { x: event.clientX, y: event.clientY });
      },
    };
    eventChain(b2);
    // const i = document.createElement('img');
    // i.src = mugImg;
    // i.style.position = 'absolute';
    // i.style.width = '90px';
    // i.style.top = '100px';
    // i.style.left = '200px';
    // scene.appendChild(i);
    // i.addEventListener('mousemove', (e) => {
    //   setPosition(i, { x: e.clientX, y: e.clientY });
    // });
    // debug-block-end

    return function () {
      // console.log(scene);
      // console.log(state);
    };
  }
}
