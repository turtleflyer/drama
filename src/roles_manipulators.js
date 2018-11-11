import { RolesManipulator } from './libs/actors_and_roles';
import { dragRole, stopCarryingRole, dropMugRole } from './role_sets/stage/stage_roles';
import generateMugsRole from './screens/gameplay/role_sets/mugsOnLine/roles/generateMugsRole';
import { startDragRole } from './screens/gameplay/supersets/mugs';

// eslint-disable-next-line
export const startStopLevel = new RolesManipulator([
  startDragRole,
  dragRole,
  dropMugRole,
  stopCarryingRole,
  generateMugsRole,
]);

startStopLevel.name = 'startStopLevel';
