/* eslint-env browser */
import { ActorsSet, Actor } from '../libs/actors_and_roles';
import './styles.css';
import { defaultFontSize, stageDimension } from './gameplay_params';
import { levelsDescription, commonInitState } from './levels_description';
import { initializeLevelEditor } from '../debug/levelEditor/levelEditor';

export function defineScaleF() {
  const innerSize = document.querySelector('body').getBoundingClientRect();
  let scaleF = 1;
  if (innerSize.width < stageDimension.width) {
    scaleF = innerSize.width / stageDimension.width;
  }
  const viewPortHeight = window.innerHeight - innerSize.top;
  if (viewPortHeight < stageDimension.height) {
    const altScaleF = viewPortHeight / stageDimension.height;
    if (altScaleF < scaleF) {
      scaleF = altScaleF;
    }
  }
  return scaleF;
}

class Stage extends ActorsSet {
  constructor() {
    const stageNode = document.querySelector('#scene');
    const scaleF = defineScaleF();
    super([new Actor(stageNode, stageDimension, { scaleF, zIndex: 10 })]);
    stageNode.style['font-size'] = `${defaultFontSize * scaleF}px`;
    this.stageNode = stageNode;
    Object.assign(this, stageDimension);
    this.params = {};
  }

  get origin() {
    const { left, top } = this.getBoundingRect();
    return { x: left, y: top };
  }

  get scaleF() {
    return [...this][0].position.scaleF;
  }

  getBoundingRect() {
    return this.stageNode.getBoundingClientRect();
  }

  defineLevel(level) {
    const levelEntry = levelsDescription[level];
    const {
      params: { mugsDistribution },
    } = levelEntry;
    const totalVolume = Object.values(mugsDistribution).reduce((total, next) => total + next);
    const calculatedDistribution = {};
    Object.entries(mugsDistribution).forEach(([key, volume]) => {
      calculatedDistribution[key] = volume / totalVolume;
    });

    this.state = {
      ...commonInitState,
      ...levelEntry.initState,
      paused: false,
      level,
    };
    this.params.levelParams = { ...levelEntry.params, mugsDistribution: calculatedDistribution };
    initializeLevelEditor(levelsDescription[level]);
  }

  pause() {
    this.state.paused = true;
    this.state.pausedSince = performance.now();
  }

  resume() {
    this.state.paused = false;
    this.state.beenOnPause = performance.now() - this.state.pausedSince;
  }
}

const stage = new Stage();

stage.name = 'stage';

export default stage;
