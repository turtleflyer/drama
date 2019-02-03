/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg } from '../../../../libs/helpers_lib';
import stage from '../../../../stage/stage';
import { whiskeyGlassParams, magsCreatingParams } from './mugs_params';
import { tuneGame } from '../../../../stage/gameplay_params';
import { customerReactionsTypes } from '../customersReactions/customersReactions_params';
import { totalsOnTable } from '../totalsOnTable/totalsOnTable';
import { addSetPositionXYMethod, addMugsLifeCyclesMethods } from './mugsClass_decorators';
import { fillingGlass } from '../fillingGlass/fillingGlass';
import { getDataURL } from '../../../../libs/session_storage_lib';

const { img, volume, costOfFilledGlass } = whiskeyGlassParams;

export default class WhiskeyGlass extends Actor {
  constructor(horizontalPosition = 0) {
    const { width, empty, full } = img;
    const { beerMarkup } = tuneGame;
    super('div', { width }, { scaleF: stage.scaleF, zIndex: 50 });
    this.setPositionXY({ x: horizontalPosition, y: magsCreatingParams.lineBase });
    this.imageElement = setImg(this, getDataURL(empty), { width: '100%', bottom: '0px' });
    this.params = {
      full,
      empty,
      volume,
      profit: costOfFilledGlass * (beerMarkup - 1),
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
      totalsOnTable.createNew(true, {
        x: this.position.x,
        y: this.position.y - this.position.height,
      });

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

  goDrug() {
    const { state } = this;
    Object.assign(state, {
      place: null,
    });
    this.setZIndex(80);
    this.moneyHint.remove();
  }

  placedToBeFilled() {
    const { state } = this;
    Object.assign(state, {
      place: true,
      filled: false,
    });
    this.setZIndex(75);
    fillingGlass.addElement(this);
  }

  elevateToBeFilled() {
    this.node.style.transform = 'translateY(-5px)';
  }

  backOnTable() {
    this.node.style.transform = null;
  }

  showToBeFilled() {
    setImg(this, getDataURL(this.params.full));
  }
}

addSetPositionXYMethod(WhiskeyGlass);
addMugsLifeCyclesMethods(WhiskeyGlass);
