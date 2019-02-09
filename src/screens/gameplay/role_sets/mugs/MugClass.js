/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg } from '../../../../libs/helpers_lib';
import stage from '../../../../stage/stage';
import { tuneGame, beerCost } from '../../../../stage/gameplay_params';
import { mugTypes, magsCreatingParams } from './mugs_params';
import { customerReactionsTypes } from '../customersReactions/customersReactions_params';
import { totalsOnTable } from '../totalsOnTable/totalsOnTable';
import { addSetPositionXYMethod, addMugsLifeCyclesMethods } from './mugsClass_decorators';
import { fillingMugs } from '../fillingMugs/fillingMugs';
import { getDataURL } from '../../../../libs/session_storage_lib';
import './styles.css';

export default class Mug extends Actor {
  constructor(beerType, horizontalPosition = 0) {
    const { img, volume } = mugTypes[beerType];
    const {
      width, empty, fillingPhasesImgs, overfilledPhasesImgs,
    } = img;
    const { beerMarkup } = tuneGame;
    super('div', { width }, { scaleF: stage.scaleF, zIndex: 50 });
    this.setPositionXY({ x: horizontalPosition, y: magsCreatingParams.lineBase });
    setImg(this, getDataURL(empty), { width: '100%', bottom: '0px' });
    this.beerType = beerType;
    this.params = {
      fillingPhasesImgs,
      overfilledPhasesImgs,
      numberOfFillingPhases: fillingPhasesImgs.length,
      numberOfOverfilledPhases: overfilledPhasesImgs.length,
      volume,
      empty,
      profit: volume * beerCost[beerType] * (beerMarkup - 1),
    };
    this.getAppendedAsChild(stage);
    this.born();
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
      setImg(this, getDataURL(overfilledPhasesImgs[overfilledPhase]));
    } else if (!totalBeer) {
      setImg(this, getDataURL(empty));
    } else {
      const numberOfSteps = totalBeer * (numberOfFillingPhases + 0.3) - 0.3;
      if (numberOfSteps < 0) {
        setImg(this, getDataURL(empty));
      } else {
        setImg(this, getDataURL(fillingPhasesImgs[Math.floor(numberOfSteps)]));
      }
    }
    return this;
  }

  turnIntoMoney() {
    const {
      beerType,
      state: { total: beerTotalAmount },
      params: { volume: mugVolume },
    } = this;
    const { drunkFactor } = stage.state;
    const {
      reputationDecrement, reputationIncrement, drunkFactorIncrement, beerMarkup,
    } = tuneGame;
    // prettier-ignore
    const targetBeer = this.state.beers && this.state.beers[beerType]
      ? this.state.beers[beerType] : 0;

    const totalsPosition = { x: this.position.x, y: this.position.y - this.position.height };

    if (!beerTotalAmount || beerTotalAmount < 0.9 / drunkFactor) {
      stage.state.reputation += reputationDecrement;
      if (beerTotalAmount) {
        totalsOnTable.createNew(false, totalsPosition);
      }

      return { money: 0, reaction: customerReactionsTypes.TOO_FEW };
    }

    if (targetBeer / beerTotalAmount < 0.9 / drunkFactor) {
      stage.state.reputation += reputationDecrement;
      totalsOnTable.createNew(false, totalsPosition);

      return { money: 0, reaction: customerReactionsTypes.WRONG_BEER };
    }

    stage.state.drunkFactor += drunkFactorIncrement;
    stage.state.reputation += reputationIncrement;
    totalsOnTable.createNew(true, totalsPosition);

    return {
      money: mugVolume * beerCost[beerType] * beerMarkup,
      reaction: customerReactionsTypes.OK,
    };
  }

  /**
   *
   * Life Cycles
   */

  goDrug() {
    const { state } = this;
    if (state.place) {
      state.place.releaseMug();
    }
    Object.assign(state, {
      place: null,
      lastTime: null,
    });
    this.setZIndex(80);
    this.moneyHint.remove();
  }

  placedToBeFilled(place) {
    const { state } = this;
    Object.assign(state, {
      place,
      beers: state.beers || {},
      total: state.total || 0,
      overfilled: state.overfilled || false,
    });
    this.updateNextThreshold();
    this.setZIndex(75);
    place.placeMug(this);
    fillingMugs.addElement(this);
  }
}

addSetPositionXYMethod(Mug);
addMugsLifeCyclesMethods(Mug);
