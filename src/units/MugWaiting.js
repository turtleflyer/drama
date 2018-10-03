/* eslint-env browser */
import { parseDescription } from '../gamelibrary';
import { howLongToWait } from '../usingparams';

export default parseDescription({
  MugWaiting: {
    mechanism: {
      filling: {
        type: 'onTick',
        customType: true,
        action({ target }) {
          if (target) {
            const currTime = Date.now();
            const { waitingSince } = target;
            if (!waitingSince) {
              target.waitingSince = currTime;
            } else if (currTime - waitingSince >= howLongToWait) {
              this.unit.delete(target);
              target.node.remove();
            }
          }
        },
      },
    },
  },
});
