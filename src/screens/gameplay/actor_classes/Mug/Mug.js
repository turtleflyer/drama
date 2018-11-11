/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg } from '../../../../libs/helpers_lib';
import { mugTypes, mugsParams } from '../../assets/gameplay_params';

export default class Mug extends Actor {
  constructor(stage, type, horizontalPosition) {
    const { img, volume } = mugTypes[type];
    const {
      width, empty, fillingPhasesImgs, overfilledPhasesImgs,
    } = img;
    super(
      document.createElement('div'),
      { x: horizontalPosition, y: mugsParams.lineBase, width },
      stage.scaleF,
    );
    setImg(this, empty, { width: '100%', bottom: '0px' });
    this.type = type;
    this.params = {
      fillingPhasesImgs,
      overfilledPhasesImgs,
      numberOfFillingPhases: fillingPhasesImgs.length,
      numberOfOverfilledPhases: overfilledPhasesImgs.length,
      volume,
    };
    this.params.overfilledAnimationPhaseTime = (volume * 1000) / this.params.numberOfFillingPhases;
    this.fillingState = {
      beers: {},
      total: 0,
      overfilled: false,
      fillingPhase: -1,
    };
    this.updateNextThreshold();
    this.getAppendedAsChild(stage);
    this.attachClassName('mugsOnLine');
  }

  get position() {
    return { x: this.left + this.width / 2, y: this.top };
  }

  getBoundingRect() {
    return this.node.querySelector('img').getBoundingClientRect();
  }

  get rectHeight() {
    return this.getBoundingRect().height / this.scaleF;
  }

  setPosition(position) {
    const { x, y, width } = position;
    Actor.prototype.setPosition.call(this, {
      left: (x || this.position.x) - (width || this.width) / 2,
      top: y || this.position.y,
      width,
    });
  }

  updateNextThreshold() {
    const { fillingState } = this;
    // prettier-ignore
    fillingState.nextFillThreshold = (fillingState.fillingPhase + 1.5)
    / this.params.numberOfFillingPhases;
    return this;
  }

  updateFillRepresentation() {
    const { overfilled, fillingPhase, overfilledPhase } = this.fillingState;
    const { fillingPhasesImgs, overfilledPhasesImgs } = this.params;
    if (overfilled) {
      setImg(this, overfilledPhasesImgs[overfilledPhase]);
    } else {
      setImg(this, fillingPhasesImgs[fillingPhase]);
    }
    return this;
  }
}
