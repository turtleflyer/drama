/* eslint-env browser */
import { ActorsSet, Actor } from '../../libs/actors_and_roles';
import {
  levelsDescription,
  commonInitState,
} from '../../screens/gameplay/assets/levels_description';
import { stageDimension } from '../../assets/common_params';

class Stage extends ActorsSet {
  constructor(node, dimension) {
    super([new Actor(node, dimension)]);
    const { left, top } = node.getBoundingClientRect();
    this.origin = { x: left, y: top };
    Object.assign(this, dimension);
    this.params = {};
    this.defineLevel(0);
  }

  get scaleF() {
    return [...this][0].position.scaleF;
  }

  getBoundingRect() {
    return this.stageNode.getBoundingClientRect();
  }

  defineLevel(level) {
    const levelEntry = levelsDescription[level];
    Object.assign((this.state = {}), commonInitState, levelEntry.initState);
    Object.assign((this.params.levelParams = {}), levelEntry.params);
  }
}

const stage = new Stage(document.querySelector('#scene'), stageDimension);

stage.name = 'stage';

export default stage;
