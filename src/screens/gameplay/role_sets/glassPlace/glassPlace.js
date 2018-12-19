import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import { glassPlaceParams } from './glassPlace_params';
import stage from '../../../../stage/stage';
import { addWhereToPlaceMugMethod } from '../../../../libs/class_decorators';

class GlassPlace extends Actor {
  constructor() {
    super('div', glassPlaceParams.position, { scaleF: stage.scaleF, zIndex: 30 });
    this.getAppendedAsChild(stage);
    this.setPosition();
    const {
      left, right, top, bottom,
    } = this.node.getBoundingClientRect();

    this.centerOfGlassPlace = {
      x: ((left + right) / 2 - stage.origin.x) / stage.scaleF,
      y: ((top + bottom) / 2 - stage.origin.y) / stage.scaleF,
    };

    /**
     * Debugging purpose
     */
    this.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';
    /**
     *
     */
  }
}

addWhereToPlaceMugMethod(GlassPlace, glassPlaceParams);

// eslint-disable-next-line
export const glassPlace = new ActorsSet();
glassPlace.getInitializer(function () {
  const newGlassPlace = new GlassPlace();
  this.addElement(newGlassPlace);
  this.centerOfGlassPlace = newGlassPlace.centerOfGlassPlace;
});

glassPlace.name = 'glassPlace';
