/* eslint-env browser */
import { ActorsSet, Actor } from '../../libs/actors_and_roles';
import {
  levelsDescription,
  commonInitState,
} from '../../screens/gameplay/assets/levels_description';
import { stageDimension } from '../../assets/common_params';
import './styles.css';

export function defineScaleF() {
  const { innerWidth } = window;
  let scaleF = 1;
  if (innerWidth < stageDimension.width) {
    scaleF = innerWidth / stageDimension.width;
  }
  return scaleF;
}

class Stage extends ActorsSet {
  constructor() {
    const stageNode = document.querySelector('#scene');
    super([new Actor(stageNode, stageDimension, { scaleF: defineScaleF(), zIndex: 10 })]);
    this.stageNode = stageNode;
    const { left, top } = this.getBoundingRect();
    this.origin = { x: left, y: top };
    Object.assign(this, stageDimension);
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
    this.state = { ...commonInitState, ...levelEntry.initState, paused: false };
    this.params.levelParams = { ...levelEntry.params };
  }

  pause() {
    this.state.paused = true;
  }

  resume() {
    this.state.paused = false;
  }
}

const stage = new Stage();

stage.name = 'stage';

export default stage;
