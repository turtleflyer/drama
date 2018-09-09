/* eslint-env browser */
import {
  commonParams,
  getUnit,
  appendPx,
  GameActor,
  parseDescription,
  startModules,
} from '../../gamelibrary';
import {
  makeUnit, registerEventType, fireEvent, eventChain,
} from '../../eventswork';

export default parseDescription({
  Scene: {
    nested() {
      const { sceneWidth, sceneHeight } = commonParams;
      return [
        new GameActor(document.querySelector('#scene'), {
          width: sceneWidth,
          height: sceneHeight,
        }),
        getUnit('BeerMug'),
      ];
    },
  },
});
