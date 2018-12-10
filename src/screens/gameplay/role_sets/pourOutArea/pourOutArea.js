/* eslint-env browser */
import { Actor, ActorsSet } from '../../../../libs/actors_and_roles';
import { pourOutAreaParams } from './pourOutArea_params';
import stage from '../../../../stage/stage';

const area = new Actor('div', pourOutAreaParams.position, {
  scaleF: stage.scaleF,
  zIndex: 30,
});

/**
 * Debugging purpose
 */
area.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';

// eslint-disable-next-line
export const pourOutArea = new ActorsSet();

pourOutArea.name = 'pourOutArea';

pourOutArea.getInitializer(function () {
  this.addElement(area);
  area.getAppendedAsChild(stage);
});
