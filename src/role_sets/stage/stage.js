/* eslint-env browser */
import { ActorsSet, Actor } from '../../libs/actors_and_roles';
import {
  levelsDescription,
  commonInitState,
} from '../../screens/gameplay/assets/levels_description';
import { stageDimension } from '../../assets/common_params';

class Stage extends ActorsSet {
  constructor(dimension) {
    const stageNode = document.querySelector('#scene');
    super([new Actor(stageNode, dimension)]);
    this.stageNode = stageNode;
    const { left, top } = this.getBoundingRect();
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
    this.state = { ...commonInitState, ...levelEntry.initState };
    this.params.levelParams = { ...levelEntry.params };
  }
}

const stage = new Stage(stageDimension);

stage.name = 'stage';

export default stage;
