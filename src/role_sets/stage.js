/* eslint-env browser */
import { stageDimension } from '../common_params';
import { ActorsSet, Actor } from '../actors_and_roles';

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
    switch (level) {
      case 0:
        Object.assign(this, {
          mugsSpeed: -75,
          money: 100,
          loanExpenses: 0,
          initMugDensity: 4,
        });
        break;

      default:
        break;
    }
    this.reputation = 100;
    this.drunkFactor = 1;
  }
}

export default new Stage(document.querySelector('#scene'), stageDimension);
