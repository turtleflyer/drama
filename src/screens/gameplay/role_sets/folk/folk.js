import { Actor, ActorsSet } from '../../../../libs/actors_and_roles';
import { folkParams } from './folk_params';
import stage from '../../../../stage/stage';
import { getDataURL } from '../../../../libs/session_storage_lib';
import { setImg, removeAfterAnimationEnds } from '../../../../libs/helpers_lib';
import { setA } from '../../supersets/setA';
import './styles.css';

class FolkIllustration extends Actor {
  constructor(level) {
    super('div', folkParams.position, { scaleF: stage.scaleF, zIndex: 48 });
    setImg(this, getDataURL(folkParams.img[level]), { width: '100%', bottom: '0px' });
  }

  initialize() {
    this.currentLevel = 0;
    this.updateIllustration();
    this.getAppendedAsChild(stage);
  }

  checkProgress() {
    if (this.currentLevel < folkParams.drunkBrackets.length) {
      const {
        state: { drunkFactor },
      } = stage;
      if (drunkFactor >= folkParams.drunkBrackets[this.currentLevel]) {
        this.currentLevel++;
        this.updateIllustration();
      }
    }
  }
}

// eslint-disable-next-line
export const folk = new ActorsSet();

folk.name = 'folk';

removeAfterAnimationEnds(folk);

folk.addNewIllustration = function () {
  const { actualIllustration } = this;
  const folkIllustration = new FolkIllustration(this.currentLevel);
  folkIllustration.getAppendedAsChild(stage);
  folkIllustration.attachClassName('folkIllustration--fading-in');
  folkIllustration.node.addEventListener('animationend', () => {
    this.addElement(folkIllustration);
  });
  this.actualIllustration = folkIllustration;
  if (actualIllustration) {
    actualIllustration.attachClassName('folkIllustration--fading-out');
  }
};

folk.checkProgress = function () {
  if (this.currentLevel < folkParams.drunkBrackets.length) {
    const {
      state: { drunkFactor },
    } = stage;
    if (drunkFactor >= folkParams.drunkBrackets[this.currentLevel]) {
      this.currentLevel++;
      this.addNewIllustration();
    }
  }
};

folk.getInitializer(function () {
  this.actualIllustration = null;
  this.currentLevel = 0;
  this.addNewIllustration();
});

setA.addElement(folk);
