/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg, addSetPositionXYMethod } from '../../../../libs/helpers_lib';
import stage from '../../../../stage/stage';
import './styles.css';
import { whiskeyGlassParams, magsCreatingParams } from './mugs_params';
import { tuneGame } from '../../../../stage/gameplay_params';
import { customerReactionsTypes } from '../customersReactions/customersReactions_params';
import { totalsOnTable } from '../totalsOnTable/totalsOnTable';

const { img, volume, costOfFilledGlass } = whiskeyGlassParams;

export default class WhiskeyGlass extends Actor {
  constructor(horizontalPosition = 0) {
    const { width, empty, full } = img;
    super('div', {}, { scaleF: stage.scaleF, zIndex: 50 });
    addSetPositionXYMethod(this);
    this.setPositionXY({ x: horizontalPosition, y: magsCreatingParams.lineBase, width });
    setImg(this, empty, { width: '100%', bottom: '0px' });
    this.params = {
      full,
      empty,
      volume,
    };
    this.getAppendedAsChild(stage);
    this.born();
  }

  turnIntoMoney() {
    const {
      state: { filled: isGlassFilled },
    } = this;

    const { state: stateOfStage } = stage;
    const {
      reputationDecrement, reputationIncrement, drunkFactorIncrement, beerMarkup,
    } = tuneGame;

    if (isGlassFilled) {
      stateOfStage.drunkFactor += drunkFactorIncrement;
      stateOfStage.reputation += reputationIncrement;
      totalsOnTable.createNew(true, this.position.x);

      return {
        money: costOfFilledGlass * beerMarkup,
        reaction: customerReactionsTypes.OK,
      };
    }

    stateOfStage.reputation += reputationDecrement;

    return { money: 0, reaction: customerReactionsTypes.TOO_FEW };
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
    Object.assign(state, {
      placed: null,
    });
    this.setZIndex(80);
  }

  dropDown() {
    this.setZIndex(90);
    this.attachClassName('fallenMug');
  }

  placedToBeFilled() {
    const { state } = this;
    Object.assign(state, {
      placed: true,
      filled: false,
    });
    this.setZIndex(75);
  }

  carriedToCustomer() {
    Object.assign(this.state, { placed: true, waitingSince: Date.now() });
    this.setZIndex(75);
    this.attachClassName('waitingMug');
  }
}
