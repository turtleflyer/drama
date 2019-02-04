import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import { faucets } from '../faucets/faucets';
import stage from '../../../../stage/stage';
import { mugPlacesParams } from './mugPlaces_params';
import { addWhereToPlaceMugMethod } from './mugPlaceClass_decorators';
import { makePlaceAbleHighlighting } from '../../../../debug/highlightZonesCheck_lib';

class MugPlace extends Actor {
  constructor(faucet, position) {
    super('div', position, { scaleF: stage.scaleF, zIndex: 70 });
    this.faucet = faucet;
    this.getAppendedAsChild(faucet);
  }

  placeMug(mug) {
    this.state.placedMug = mug;
  }

  releaseMug() {
    this.state.placedMug = null;
  }
}

addWhereToPlaceMugMethod(MugPlace, mugPlacesParams);

makePlaceAbleHighlighting(MugPlace);

// eslint-disable-next-line
export const mugPlaces = new ActorsSet();

mugPlaces.getInitializer(function () {
  this.addElements(
    [...faucets].reduce((places, faucet) => {
      const newPlaces = faucet.params.mugPlacePositions.map(
        position => new MugPlace(faucet, position),
      );
      faucet.params.mugPlaces = newPlaces;
      return places.concat(newPlaces);
    }, []),
  );
});

mugPlaces.name = 'mugPlaces';
