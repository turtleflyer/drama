/* eslint-env browser */
import { Actor, ActorsSet } from '../../../../libs/actors_and_roles';
import { pourOutAreaParams } from './pourOutArea_params';
import stage from '../../../../stage/stage';
import { makePlaceAbleHighlighting } from '../../../../debug/debugPanel/highlightZonesCheck_lib';

const area = new Actor('div', pourOutAreaParams.position, {
  scaleF: stage.scaleF,
  zIndex: 70,
});

makePlaceAbleHighlighting(area);

// eslint-disable-next-line
export const pourOutArea = new ActorsSet();

pourOutArea.name = 'pourOutArea';

pourOutArea.getInitializer(function () {
  this.addElement(area);
  area.getAppendedAsChild(stage);
});
