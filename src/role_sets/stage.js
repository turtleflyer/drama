/* eslint-env browser */
import { stageDimension, stageParams } from '../common_params';
import { ActorsSet, Actor } from '../actors_and_roles';
import levelsDescription from '../levels_description';

class Stage extends ActorsSet {
  constructor(node, dimension) {
    super([new Actor(node, dimension)]);
    this.stageNode = node;
    Object.assign(this, dimension);
    this.defineLevel(0);
  }

  get scaleF() {
    return [...this][0].scaleF;
  }

  defineLevel(level) {
    Object.assign(this, levelsDescription[level], stageParams);
  }
}

export default new Stage(document.querySelector('#scene'), stageDimension);
