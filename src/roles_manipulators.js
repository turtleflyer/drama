import { RolesManipulator } from './libs/actors_and_roles';
import { dragRole, stopCarryingRole, dropMugRole } from './role_sets/stage/stage_roles';
import generateMugsRole from './screens/gameplay/role_sets/mugsOnLine/roles/generateMugsRole';
import { waitMugDisappearRole } from './screens/gameplay/role_sets/waitingMugs';
import { fillMugsRole } from './screens/gameplay/role_sets/fillingMugs';
import { countExpensesRole } from './screens/gameplay/role_sets/faucets';
import { inspectDamageToDisappearRole } from './screens/gameplay/role_sets/damages';
import { watchReactionsLifeRole } from './screens/gameplay/role_sets/customersReactions';

// eslint-disable-next-line
export const startStopLevel = new RolesManipulator([
  dragRole,
  dropMugRole,
  stopCarryingRole,
  generateMugsRole,
  fillMugsRole,
  waitMugDisappearRole,
  countExpensesRole,
  inspectDamageToDisappearRole,
  watchReactionsLifeRole,
]);

startStopLevel.name = 'startStopLevel';
