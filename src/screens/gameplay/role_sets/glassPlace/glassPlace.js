import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import { glassPlaceParams } from './glassPlace_params';
import stage from '../../../../stage/stage';
import { addWhereToPlaceMugMethod } from '../mugPlaces/mugPlaceClass_decorators';
import { makePlaceAbleHighlighting } from '../../../../debug/highlight_zone_class_assets';

class GlassPlace extends Actor {
  constructor() {
    super('div', glassPlaceParams.position, { scaleF: stage.scaleF, zIndex: 70 });
    this.getAppendedAsChild(stage);
    this.setPosition();
    const {
      left, right, top, bottom,
    } = this.node.getBoundingClientRect();

    this.centerXY = {
      x: ((left + right) / 2 - stage.origin.x) / stage.scaleF,
      y: ((top + bottom) / 2 - stage.origin.y) / stage.scaleF,
    };
  }
}

addWhereToPlaceMugMethod(GlassPlace, glassPlaceParams);
makePlaceAbleHighlighting(GlassPlace);

// eslint-disable-next-line
export const glassPlaceSet = new ActorsSet();
glassPlaceSet.getInitializer(function () {
  const glassPlace = new GlassPlace();
  this.addElement(glassPlace);
  this.centerXY = glassPlace.centerXY;
});

glassPlaceSet.name = 'glassPlace';
