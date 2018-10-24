import { RolesManipulator } from '../actors_and_roles';
import dragMugFollowMouse from '../roles/dragMug_followMouse';
import mugsStartDrag from '../roles/mugs_startDrag';
import mugsOnLineGenerateMugs from '../roles/mugsOnLine_generateMugs';
import stageDrag from '../roles/stage_drag';

export default new RolesManipulator([
  dragMugFollowMouse,
  mugsStartDrag,
  mugsOnLineGenerateMugs,
  stageDrag,
]);
