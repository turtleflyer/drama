/* eslint-env browser */
import { parseDescription } from '../gamelibrary';

export default parseDescription({
  Damages: {
    mechanism: {
      stillLive: {
        type: 'onTick',
        customType: true,
        action({ target }) {
          if (target) {
            if (Date.now() - target.bornTime > 1000) {
              this.unit.delete(target);
              target.node.remove();
            }
          }
        },
      },
    },
  },
});
