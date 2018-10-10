/* eslint-env browser */
import { parseDescription, commonParams, onAddElement } from '../gamelibrary';
import { updateStyle } from '../helperslib';
import { tuneGame } from '../usingparams';

export default parseDescription({
  FallenMug: {
    mechanism: {
      [onAddElement]: {
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
