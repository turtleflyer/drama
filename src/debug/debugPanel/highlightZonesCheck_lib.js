import { debugFlags, debugKeys } from '../debug_flags';
import { RoleClass } from '../../libs/actors_and_roles';

export function makePlaceAbleHighlighting(cl) {
  const getObj = cl.prototype || cl;
  Object.defineProperties(getObj, {
    highlight: {
      value(toHighlight = true) {
        if (toHighlight) {
          this.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';
        } else {
          this.node.style['background-color'] = null;
        }
      },
    },
  });
}

export const highlightPlaces = new RoleClass(Symbol('highlightPlaces'));

export function highlightAction({ target: place }) {
  if (place.highlight) {
    place.highlight(debugFlags[debugKeys.HIGHLIGHT_DROP_ZONES]);
  }
}
