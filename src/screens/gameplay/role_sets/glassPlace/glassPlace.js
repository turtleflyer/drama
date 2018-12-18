import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import { glassPlaceParams } from './glassPlace_params';
import stage from '../../../../stage/stage';
import { addWhereToPlaceMugMethod } from '../../../../libs/class_decorators';

export const centerOfGlassPlace = {};

class GlassPlace extends Actor {
  constructor() {
    super('div', glassPlaceParams.position, { scaleF: stage.scaleF, zIndex: 30 });
    this.getAppendedAsChild(stage);
    this.setPosition();

    /**
     * Debugging purpose
     */
    this.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';
    /**
     *
     */
  }

  setPosition(position) {
    Actor.prototype.setPosition.call(this, position);
    const {
      left, right, top, bottom,
    } = this.node.getBoundingClientRect();
    centerOfGlassPlace.x = (left + right) / 2 - stage.origin.x;
    centerOfGlassPlace.y = (top + bottom) / 2 - stage.origin.y;
  }
}

addWhereToPlaceMugMethod(GlassPlace, glassPlaceParams);

export const glassPlace = new ActorsSet();
glassPlace.getInitializer(function () {
  this.addElement(new GlassPlace());
});

glassPlace.name = 'glassPlace';
