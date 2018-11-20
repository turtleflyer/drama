import { RolesManipulator } from './libs/actors_and_roles';
import { dragRole, stopCarryingRole, dropMugRole } from './role_sets/stage/stage_roles';
import generateMugsRole from './screens/gameplay/role_sets/mugsOnLine/roles/generateMugsRole';
import { waitMugDisappearRole } from './screens/gameplay/role_sets/waitingMugs';
import { fillMugsRole } from './screens/gameplay/role_sets/fillingMugs';
import { countExpensesRole } from './screens/gameplay/role_sets/faucets';
import { updateMoneyRole } from './screens/gameplay/role_sets/scoreBoard';
import { inspectTotalsToDisappearRole } from './screens/gameplay/role_sets/totalsOnTable';

// eslint-disable-next-line
export const startStopLevel = new RolesManipulator([
  updateMoneyRole,
  dragRole,
  dropMugRole,
  stopCarryingRole,
  generateMugsRole,
  fillMugsRole,
  waitMugDisappearRole,
  countExpensesRole,
  inspectTotalsToDisappearRole,
]);

startStopLevel.name = 'startStopLevel';
