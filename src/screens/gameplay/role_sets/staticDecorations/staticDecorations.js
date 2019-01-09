/* eslint-env browser */
import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { setImg } from '../../../../libs/helpers_lib';
import './styles.css';
import {
  objectivesParams,
  backOfStagePosition,
  frontOfStagePosition,
} from './staticDecorations_params';
import { getDataURL, imagesDataURL } from '../../../../libs/session_storage_lib';
import { setA } from '../../supersets/setA';
import backOfStageImg from './img/stage_back.jpg';
import frontOfStageImg from './img/stage_front.png';

imagesDataURL.addElements([backOfStageImg, frontOfStageImg]);

export const backOfStage = new Actor('div', backOfStagePosition, {
  scaleF: stage.scaleF,
  zIndex: 20,
});

export const frontOfStage = new Actor('div', frontOfStagePosition, {
  scaleF: stage.scaleF,
  zIndex: 65,
});

const postedSign = new Actor('div', objectivesParams.position, {
  scaleF: stage.scaleF,
  zIndex: 80,
}).attachClassName('objectives');

export const staticDecorations = new ActorsSet();

staticDecorations.getInitializer(function () {
  this.addElements([
    setImg(backOfStage, getDataURL(backOfStageImg), { width: '100%' }),
    setImg(frontOfStage, getDataURL(frontOfStageImg), { width: '100%', bottom: '0px' }),
    postedSign,
  ]);
  backOfStage.getAppendedAsChild(stage);
  frontOfStage.getAppendedAsChild(stage);
  [...postedSign.node.childNodes].forEach(child => postedSign.node.removeChild(child));
  postedSign.node.innerHTML = `<p>You owe</p><p class="objectives--money">$${
    stage.params.levelParams.moneyToEarn
  }</p>`;
  postedSign.getAppendedAsChild(stage);
});

setA.addElement(staticDecorations);
