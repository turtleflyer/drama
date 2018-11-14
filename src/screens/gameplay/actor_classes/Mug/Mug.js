/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg } from '../../../../libs/helpers_lib';
import {
  mugTypes,
  mugsParams,
  tuneGame,
  customerReactionsTypes,
  beerCost,
} from '../../assets/gameplay_params';

export default class Mug extends Actor {
  constructor(stage, beerType, horizontalPosition = 0) {
    const { img, volume } = mugTypes[beerType];
    const {
      width, empty, fillingPhasesImgs, overfilledPhasesImgs,
    } = img;
    super(
      document.createElement('div'),
      { x: horizontalPosition, y: mugsParams.lineBase, width },
      stage.scaleF,
    );
    setImg(this, empty, { width: '100%', bottom: '0px' });
    this.beerType = beerType;
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
    this.stage = stage;
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

  turnIntoMoney() {
    const { beerType: targetBeerType } = this;
    const { total: beerTotalAmount } = this.state;
    const { drunkFactor } = this.stage.state;
    const {
      reputationDecrement, reputationIncrement, drunkFactorIncrement, beerMarkup,
    } = tuneGame;
    const targetBeer = this.state.beers[targetBeerType];
    switch (true) {
      case beerTotalAmount < 0.9 / drunkFactor:
        this.stage.state.reputation += reputationDecrement;
        return { money: 0, reaction: customerReactionsTypes.TOO_FEW };

      case targetBeer / beerTotalAmount < 0.9 / drunkFactor:
        this.stage.state.reputation += reputationDecrement;
        return { money: 0, reaction: customerReactionsTypes.WRONG_BEER };

      default:
        this.stage.state.drunkFactor += drunkFactorIncrement;
        this.stage.state.reputation += reputationIncrement;
        return {
          money: beerTotalAmount * this.params.volume * beerCost[targetBeerType] * beerMarkup,
          reaction: customerReactionsTypes.OK,
        };
    }
  }

  /**
   *
   * Life Cycles
   */

  born() {
    this.state.hidden = true;
    this.attachClassName('mugsOnLine');
  }

  appearOnStage() {
    this.state.hidden = false;
  }

  goDrug() {
    const { state } = this;
    if (state.faucet) {
      state.faucet.releaseMug();
    }
    Object.assign(state, {
      faucet: null,
      lastTime: null,
      placed: null,
    });
    this.attachClassName('dragMug');
  }

  dropDown() {
    this.attachClassName('fallenMug');
  }

  placedToBeFilled(faucet) {
    const { state } = this;
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
  }

  carriedToCustomer() {
    Object.assign(this.state, { placed: true, waitingSince: Date.now() });
    this.attachClassName('waitingMug');
  }
}
