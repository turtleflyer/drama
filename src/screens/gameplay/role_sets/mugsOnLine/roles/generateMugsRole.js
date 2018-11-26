/* eslint-env browser */
import { mugsOnLine } from '../mugsOnLine';
import stage from '../../../../../role_sets/stage/stage';
import Mug from '../../../actor_classes/Mug/Mug';
import { stageDimension } from '../../../../../assets/common_params';
import { tuneGame, mugsParams } from '../../../assets/gameplay_params';
import { onPulseTick } from '../../../../../assets/role_classes';

const { width: stageWidth } = stageDimension;

export default onPulseTick.registerAction(mugsOnLine, {
  action({ target: mug }) {
    const currTime = performance.now();
    const { state } = this.roleSet;
    const { mugsSpeed } = stage.params.levelParams;

    if (this.roleSet.size > 0) {
      const {
        params: { bornTime },
      } = mug;

      const calculatedPosition = stageWidth - (currTime - bornTime) * (mugsSpeed / 1000);

      // Check if the mug disappeared from the stage
      if (calculatedPosition < -(mug.position.width / 2)) {
        this.roleSet.deleteElement(mug);
        mug.remove();
        stage.state.reputation += tuneGame.reputationDecrement;
      } else {
        mug.setPosition({ x: calculatedPosition });
      }
    } else if (
      state.timeOfNextBirth
      && state.timeOfNextBirth - currTime > mugsParams.maxDelayToGenerateNext * 1000
    ) {
      state.timeOfNextBirth = null;
    }

    if (
      state.timeOfNextBirth
      && state.timeOfNextBirth - mugsParams.initialDelay * 1000 < currTime
    ) {
      const generatedMug = new Mug(this.roleSet.determineTypeOfBeer(), stageWidth + 1000);
      generatedMug.params.bornTime = state.timeOfNextBirth;
      this.roleSet.addElement(generatedMug);
      state.timeOfNextBirth = this.roleSet.newBornTime(generatedMug);
    }
  },
});
