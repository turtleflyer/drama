/* eslint-env browser */
import { ActorsSet, Actor } from '../../libs/actors_and_roles';
import levelsDescription from '../../screens/gameplay/assets/levels_description';
import { stageParams } from '../../screens/gameplay/assets/gameplay_params';
import { stageDimension } from '../../assets/common_params';

class Stage extends ActorsSet {
  constructor(node, dimension) {
    super([new Actor(node, dimension)]);
    this.stageNode = node;
    const { left, top } = node.getBoundingClientRect();
    this.origin = { x: left, y: top };
    Object.assign(this, dimension);
    this.defineLevel(0);
  }

  get scaleF() {
    return [...this][0].scaleF;
  }

  appendAsChild(actor) {
    if (actor instanceof Actor) {
      this.stageNode.appendChild(actor.node);
    } else {
      throw new Error('@@...');
    }
  }

  defineLevel(level) {
    Object.assign(this, levelsDescription[level], stageParams);
  }
}

export default new Stage(document.querySelector('#scene'), stageDimension);
