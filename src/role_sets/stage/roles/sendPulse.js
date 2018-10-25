/* eslint-env browser */
import stage from '../stage';
import { pulseTimeout } from '../../../common_params';
import pulse from '../../../role_classes/pulse';
import onPulseTick from '../../../role_classes/onPulseTick';
import setA from '../../../screens/gameplay/supersets/setA';

export default pulse.registerAction(stage, {
  action() {
    onPulseTick.fire(setA);
    window.setTimeout(() => {
      this.fireItself();
    }, pulseTimeout);
  },
});
