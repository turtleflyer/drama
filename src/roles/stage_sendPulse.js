/* eslint-env browser */
import stage from '../role_sets/stage';
import { pulseTimeout } from '../common_params';
import pulse from '../role_classes/pulse';
import onPulseTick from '../role_classes/onPulseTick';
import setA from '../supersets/setA';

export default pulse.registerAction(stage, {
  action() {
    onPulseTick.fire(setA);
    window.setTimeout(() => {
      this.fireItself();
    }, pulseTimeout);
  },
});
