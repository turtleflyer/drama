/* eslint-env browser */
import {
  commonParams,
  getUnit,
  appendPx,
  GameActor,
  parseDescription,
  startModules,
} from '../../gamelibrary';

export default parseDescription({
  DragMug: {
    nested: [],
    mechanism: {
      followmouse: {
        regAsCustom: true,
        action({ target, eventObj: { x, y } }) {
          target.setPosition({ left: x - target.mouseX, top: y - target.mouseY });
        },
      },

      leaveunit: {
        regAsCustom: true,
        action({ target }) {
          this.unit.delete(target);
        },
      },
    },
  },
});
