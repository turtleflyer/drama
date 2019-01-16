/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg } from '../../../../libs/helpers_lib';
import jetImg from './img/jet.gif';
import stage from '../../../../stage/stage';
import { faucetParams, switchTypes, brokenSwitchTimeToTry } from './faucets_params';
import { imagesDataURL, getDataURL } from '../../../../libs/session_storage_lib';

imagesDataURL.addElement(jetImg);

function switchNormalFaucet() {
  const {
    state,
    params: { jet, beerTypes, mugPlaces },
  } = this;
  state.phase = 1 - state.phase;
  this.switchState();
  // prettier-ignore
  state.descriptionOfRunningState = state.phase === 1
    ? { beer: beerTypes[0], place: mugPlaces[0] } : null;
  if (state.descriptionOfRunningState) {
    jet.getAppendedAsChild(this);
  } else {
    jet.remove();
  }
}

function switchBrokenFaucet() {
  const {
    state,
    params: { jet, beerTypes, mugPlaces },
  } = this;
  if (state.phase === 0) {
    state.phase = 1;
    this.switchState();
    state.descriptionOfRunningState = { beer: beerTypes[0], place: mugPlaces[0] };
    jet.getAppendedAsChild(this);
  } else {
    state.phase = 0;
    this.switchState();
    window.setTimeout(() => {
      state.phase = 1;
      this.switchState();
    }, brokenSwitchTimeToTry);
  }
}

function switchDualFaucet() {
  const {
    state,
    params: {
      jet, beerTypes, mugPlaces, jetPositions,
    },
  } = this;
  const phase = (state.phase = 1 - state.phase);
  const jetPosition = jetPositions[phase];
  const mugPlace = mugPlaces[phase];
  const beerType = beerTypes[phase];
  this.switchState();
  jet.setPosition(jetPosition);
  jet.getAppendedAsChild(this);
  state.descriptionOfRunningState = { beer: beerType, place: mugPlace };
}

export default class Faucet extends Actor {
  constructor(model, horizontalPosition) {
    const {
      size,
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePositions,
      handlePosition,
      jetPositions,
    } = model;
    super('div', Object.assign({ left: horizontalPosition }, size, faucetParams.position), {
      scaleF: stage.scaleF,
      zIndex: 68,
    });
    setImg(this, getDataURL(imgPhases[0]), { bottom: '0px', width: '100%' });
    this.params = {
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePositions,
      jetPositions,
      handlePosition,
    };
    this.state = { beer: beerTypes[0], phase: 0 };
    const jet = new Actor('div', {}, { scaleF: stage.scaleF });
    setImg(jet, getDataURL(jetImg), { height: '100%' });
    this.linkActor(jet);
    Object.assign(this.params, { jet });
    if (switchType === switchTypes.NORMAL || switchType === switchTypes.BROKEN) {
      jet.setPosition(jetPositions[0]);
      if (switchType === switchTypes.NORMAL) {
        this.switch = switchNormalFaucet;
      } else {
        this.switch = switchBrokenFaucet;
      }
    } else if (switchType === switchTypes.DUAL) {
      this.switch = switchDualFaucet;
    }
    this.getAppendedAsChild(stage);
  }

  switchState() {
    this.state.lastRenderedDamage = null;
    setImg(this, getDataURL(this.params.imgPhases[this.state.phase]));
  }
}
