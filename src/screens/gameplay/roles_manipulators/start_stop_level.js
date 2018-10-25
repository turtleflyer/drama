import { RolesManipulator } from '../../../actors_and_roles';
import followMouse from '../role_sets/dragMug/roles/followMouse';
import startDrag from '../supersets/mugs/roles/startDrag';
import generateMugs from '../role_sets/mugsOnLine/roles/generateMugs';
import drag from '../../../role_sets/stage/roles/drag';

export default new RolesManipulator([
  followMouse,
  startDrag,
  generateMugs,
  drag,
]);
