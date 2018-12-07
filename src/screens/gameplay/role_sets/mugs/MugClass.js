/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg } from '../../../../libs/helpers_lib';
import stage from '../../../../stage/stage';
import './styles.css';
import { tuneGame, beerCost } from '../../../../stage/gameplay_params';
import { mugsParams, mugTypes } from './mugs_params';
import { customerReactionsTypes } from '../customersReactions/customersReactions_params';
import { totalsOnTable } from '../totalsOnTable/totalsOnTable';

export default class Mug extends Actor {
  constructor(beerType, horizontalPosition = 0) {
    const { img, volume } = mugTypes[beerType];
    const {
      width, empty, fillingPhasesImgs, overfilledPhasesImgs,
    } = img;
    super(
      'div',
      { x: horizontalPosition, y: mugsParams.lineBase, width },
      { scaleF: stage.scaleF, zIndex: 50 },
    );
    setImg(this, empty, { width: '100%', bottom: '0px' });
    this.beerType = beerType;
    this.params = {
      fillingPhasesImgs,
      overfilledPhasesImgs,
      numberOfFillingPhases: fillingPhasesImgs.length,
      numberOfOverfilledPhases: overfilledPhasesImgs.length,
      volume,
      empty,
    };
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
    const {
      state: { overfilled, total: totalBeer, overfilledPhase },
      params: {
        fillingPhasesImgs, numberOfFillingPhases, overfilledPhasesImgs, empty,
      },
    } = this;
    if (overfilled) {
      setImg(this, overfilledPhasesImgs[overfilledPhase]);
    } else if (!totalBeer) {
      setImg(this, empty);
    } else {
      const numberOfSteps = totalBeer * (numberOfFillingPhases + 0.3) - 0.3;
      if (numberOfSteps < 0) {
        setImg(this, empty);
      } else {
        setImg(this, fillingPhasesImgs[Math.floor(numberOfSteps)]);
      }
    }
    return this;
  }

  turnIntoMoney() {
    const {
      beerType: targetBeerType,
      state: { total: beerTotalAmount },
    } = this;
    const { drunkFactor } = stage.state;
    const {
      reputationDecrement, reputationIncrement, drunkFactorIncrement, beerMarkup,
    } = tuneGame;
    const targetBeer = this.state.beers ? this.state.beers[targetBeerType] : 0;

    switch (true) {
      case !beerTotalAmount || beerTotalAmount < 0.9 / drunkFactor:
        stage.state.reputation += reputationDecrement;
        if (beerTotalAmount) {
          totalsOnTable.createNew(false, this.position.x);
        }
        return { money: 0, reaction: customerReactionsTypes.TOO_FEW };

      case targetBeer / beerTotalAmount < 0.9 / drunkFactor:
        stage.state.reputation += reputationDecrement;
        totalsOnTable.createNew(false, this.position.x);
        return { money: 0, reaction: customerReactionsTypes.WRONG_BEER };

      default: {
        stage.state.drunkFactor += drunkFactorIncrement;
        stage.state.reputation += reputationIncrement;
        totalsOnTable.createNew(true, this.position.x);
        return {
          money: beerTotalAmount * this.params.volume * beerCost[targetBeerType] * beerMarkup,
          reaction: customerReactionsTypes.OK,
        };
      }
    }
  }

  /**
   *
   * Life Cycles
   */

  born() {
    this.state.hidden = true;
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
    this.setZIndex(80);
  }

  dropDown() {
    this.setZIndex(90);
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
    });
    this.updateNextThreshold();
    this.setZIndex(75);
  }

  carriedToCustomer() {
    Object.assign(this.state, { placed: true, waitingSince: Date.now() });
    this.setZIndex(75);
    this.attachClassName('waitingMug');
  }
}
