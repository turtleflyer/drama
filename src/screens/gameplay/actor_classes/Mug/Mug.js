/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg } from '../../../../libs/helpers_lib';
import { mugTypes, mugsParams } from '../../assets/gameplay_params';

export default class Mug extends Actor {
  constructor(stage, type, horizontalPosition = 0) {
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
    this.waitingState = {};
    this.getAppendedAsChild(stage);
    this.born();
  }

  getBoundingRect() {
    return this.node.querySelector('img').getBoundingClientRect();
  }

  get rectHeight() {
    return this.getBoundingRect().height / this.position.scaleF;
  }

  setPosition(position) {
    const { x, y, width } = position;
    Object.assign(this.position, { x: x || this.position.x, y: y || this.position.y });
    Actor.prototype.setPosition.call(this, {
      left: this.position.x - (width || this.position.width) / 2,
      top: this.position.y,
      width,
    });
  }

  updateNextThreshold() {
    // prettier-ignore
    this.state.nextFillThreshold = (this.state.fillingPhase + 1.5)
      / this.params.numberOfFillingPhases;
    return this;
  }

  updateFillRepresentation() {
    const { overfilled, fillingPhase, overfilledPhase } = this.state;
    const { fillingPhasesImgs, overfilledPhasesImgs } = this.params;
    if (overfilled) {
      setImg(this, overfilledPhasesImgs[overfilledPhase]);
    } else {
      setImg(this, fillingPhasesImgs[fillingPhase]);
    }
    return this;
  }
}

Actor.defineLifeCycleStage(Mug, 'born', function (state) {
  state.hidden = true;
  this.attachClassName('mugsOnLine');
});

Actor.defineLifeCycleStage(Mug, 'appearOnStage', (state) => {
  state.hidden = false;
});

Actor.defineLifeCycleStage(Mug, 'goDrug', function (state) {
  if (state.faucet) {
    state.faucet.releaseMug();
  }
  Object.assign(state, {
    faucet: null,
    lastTime: null,
    placed: null,
  });
  this.attachClassName('dragMug');
});

Actor.defineLifeCycleStage(Mug, 'dropDown', function () {
  this.attachClassName('fallenMug');
});

Actor.defineLifeCycleStage(Mug, 'placedToBeFilled', function (state, faucet) {
  Object.assign(state, {
    placed: true,
    faucet,
    beers: state.beers || {},
    total: state.total || 0,
    overfilled: state.overfilled || false,
    fillingPhase: state.fillingPhase || -1,
  });
  this.updateNextThreshold();
  this.attachClassName('mugFilling');
});

Actor.defineLifeCycleStage(Mug, 'carriedToCustomer', function (state) {
  Object.assign(state, { placed: true, waitingSince: Date.now() });
  this.attachClassName('waitingMug');
});
