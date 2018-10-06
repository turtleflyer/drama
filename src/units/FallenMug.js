/* eslint-env browser */
import { parseDescription, commonParams } from '../gamelibrary';
import { updateStyle } from '../helperslib';
import { tuneGame } from '../usingparams';

export default parseDescription({
  FallenMug: {
    mechanism: {
      fallDown: {
        type: 'fallDown',
        customType: true,
        action({ target }) {
          updateStyle(target.node, { transform: 'scale(0.5)' });
          commonParams.reputation += tuneGame.reputationDecrement;
          window.setTimeout(() => {
            target.node.remove();
            this.unit.delete(target);
          }, 1000);
        },
      },
    },
  },
});
