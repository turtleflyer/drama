import { RolesManipulator } from '../actors_and_roles';
import followMouse from '../screens/gameplay/role_sets/dragMug/roles/followMouse';
import startDrag from '../screens/gameplay/supersets/mugs/roles/startDrag';
import generateMugs from '../screens/gameplay/role_sets/mugsOnLine/roles/generateMugs';
import drag from '../role_sets/stage/roles/drag';

export default new RolesManipulator([
  followMouse,
  startDrag,
  generateMugs,
  drag,
]);
