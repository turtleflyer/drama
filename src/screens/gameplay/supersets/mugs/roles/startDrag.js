/* eslint-env browser */
import mousedown from '../../../../../role_classes/mousedown';
import mugs from '../mugs';
import stage from '../../../../../role_sets/stage/stage';
import dragMug from '../../../role_sets/dragMug/dragMug';

export default mousedown.registerAction(mugs, {
  action({ target, unit, event }) {
    event.preventDefault();
    // const MugFilling = getUnit('MugFilling');
    // if (unit === MugFilling) {
    //   MugFilling.delete(target);
    //   target.faucet.placedMug = null;
    //   target.faucet = null;
    //   target.placed = false;
    // }
    stage.appendAsChild(target);
    dragMug.addElement(target);
  },
});
