/* eslint-env browser */
import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import tableImg from './img/table.png';
import { setImg } from '../../../../libs/helpers_lib';
import barImg from './img/bar.png';
import './styles.css';
import { customersTablePosition, barPosition, objectivesParams } from './staticDecorations_params';
import { getDataURL, imagesDataURL } from '../../../../libs/session_storage_lib';
import { setA } from '../../supersets/setA';

imagesDataURL.addElements([tableImg, barImg]);

export const bar = new Actor('div', barPosition, { scaleF: stage.scaleF, zIndex: 60 });

export const customersTable = new Actor('div', customersTablePosition, {
  scaleF: stage.scaleF,
  zIndex: 55,
});

const postedSign = new Actor('div', objectivesParams.position, {
  scaleF: stage.scaleF,
  zIndex: 80,
}).attachClassName('objectives');

export const staticDecorations = new ActorsSet();

staticDecorations.getInitializer(function () {
  this.addElements([
    setImg(bar, getDataURL(barImg), {
      height: '100%',
      width: '100%',
      'object-fit': 'fill',
    }),
    setImg(customersTable, getDataURL(tableImg), { width: '100%' }),
    postedSign,
  ]);
  bar.getAppendedAsChild(stage);
  customersTable.getAppendedAsChild(stage);
  [...postedSign.node.childNodes].forEach(child => postedSign.node.removeChild(child));
  postedSign.node.innerHTML = `<p>The goal is to get</p><p class="objectives--money">$${
    stage.params.levelParams.moneyToEarn
  }</p><p>before the night ends</p>`;
  postedSign.getAppendedAsChild(stage);
});

customersTable.name = 'customersTable';
setA.addElement(staticDecorations);
