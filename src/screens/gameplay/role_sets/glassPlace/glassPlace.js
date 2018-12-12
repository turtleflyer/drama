import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import { glassPlaceParams } from './glassPlace_params';
import stage from '../../../../stage/stage';

class GlassPlace extends Actor {
  constructor() {
    super('div', glassPlaceParams.position, { scaleF: stage.scaleF, zIndex: 30 });
    this.getAppendedAsChild(stage);

    /**
     * Debugging purpose
     */
    this.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';
  }

  mugsLine() {
    const { y: originY } = stage.origin;
    const { top, height } = this.node.getBoundingClientRect();
    return (top - originY + height * glassPlaceParams.mugLine) / this.position.scaleF;
  }
}

// eslint-disable-next-line
export const glassPlace = new ActorsSet();
glassPlace.getInitializer(function () {
  this.addElement(new GlassPlace());
});

glassPlace.name = 'glassPlace';
