/* eslint-env browser */
import { Actor, ActorsSet, registerActionOfType } from '../../../../libs/actors_and_roles';
import { whiskeyBottleParams, whiskeyJetParams } from './whiskeyBottle_params';
import stage from '../../../../stage/stage';
import bottleImg from './img/bottle.png';
import { setImg, updateStyle } from '../../../../libs/helpers_lib';
import { bottleToFill } from '../bottleToFill/bottleToFill';
import { addSetPositionXYMethod } from '../mugs/mugsClass_decorators';
import './styles.css';
import { getDataURL, imagesDataURL } from '../../../../libs/session_storage_lib';
import { glassType } from '../../../../stage/gameplay_params';
import { fillingGlass } from '../fillingGlass/fillingGlass';
import { setA } from '../../supersets/setA';

imagesDataURL.addElement(bottleImg);

// eslint-disable-next-line
export const whiskeyBottle = new ActorsSet();

whiskeyBottle.name = 'whiskeyBottle';

const whiskeyJet = new Actor('div', whiskeyJetParams.position, {
  scaleF: stage.scaleF,
  zIndex: 70,
}).attachClassName('whiskeyJet');

class WhiskeyBottle extends Actor {
  constructor() {
    super('div', whiskeyBottleParams.position, { scaleF: stage.scaleF, zIndex: 67 });
    this.setPositionXY(whiskeyBottleParams.position);
    setImg(this, getDataURL(bottleImg), { width: '100%', bottom: '0px' });
    this.getAppendedAsChild(stage);
  }

  goToFill() {
    bottleToFill.addElement(this);
    this.linkActor(whiskeyJet);
  }

  getBackOnTable() {
    const [glass] = [...fillingGlass];
    this.setPositionXY(whiskeyBottleParams.position);
    this.setZIndex(67);
    whiskeyBottle.addElement(this);
    this.detachJet();
    if (glass) {
      glass.backOnTable();
    }
  }

  startFilling() {
    this.state.whenBeginFilling = performance.now();
  }

  stopFilling() {
    this.state.whenBeginFilling = null;
  }

  attachJet(l, angle = this.state.pitch) {
    this.state.pitch = angle;
    const angleInRad = ((angle - 270) * Math.PI) / 180;
    const height = (this.position.height / 2) * Math.sin(angleInRad) + l - 10;
    whiskeyJet.setPosition({
      left: this.position.width / 2 - (height / 2) * Math.cos(angleInRad) - 5,
      top: (height / 2) * (Math.sin(angleInRad) - 1) - 5,
      height,
    });
    updateStyle(whiskeyJet, {
      transform: `rotate(${360 - angle}deg)`,
    });
    if (!whiskeyJet.state.isJetAttached) {
      whiskeyJet.getAppendedAsChild(this);
      whiskeyJet.state.isJetAttached = true;
    }
  }

  detachJet() {
    this.linkActor(whiskeyJet, false);
    whiskeyJet.remove();
    whiskeyJet.state.isJetAttached = false;
    this.state.fillingStartPoint = null;
    this.state.fillingStartTime = null;
  }
}

addSetPositionXYMethod(WhiskeyBottle);

whiskeyBottle.getInitializer(function () {
  if (stage.params.levelParams.mugsDistribution[glassType]) {
    this.addElement(new WhiskeyBottle());
  }
});

registerActionOfType('mousedown', whiskeyBottle, {
  action({ target: bottle, event }) {
    event.preventDefault();
    bottle.goToFill();
  },
}).start();

setA.addElement(whiskeyBottle);
