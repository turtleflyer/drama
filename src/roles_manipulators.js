import { RolesManipulator } from './libs/actors_and_roles';
import {
  dragRole,
  stopCarryingRole,
  dropMugRole,
  sendPulseRole,
} from './role_sets/stage/stage_roles';
import { placeMugRole } from './screens/gameplay/supersets/dropPlaces';
import generateMugsRole from './screens/gameplay/role_sets/mugsOnLine/roles/generateMugsRole';
import { startDragRole } from './screens/gameplay/supersets/mugs';
import { followMouseRole, stopDragRole } from './screens/gameplay/role_sets/dragMug';

export const startGame = new RolesManipulator([
  sendPulseRole,
  followMouseRole,
  stopDragRole,
  placeMugRole,
]);

startGame.name = 'startGame';

export const startStopLevel = new RolesManipulator([
  startDragRole,
  dragRole,
  dropMugRole,
  stopCarryingRole,
  generateMugsRole,
]);

startStopLevel.name = 'startStopLevel';
