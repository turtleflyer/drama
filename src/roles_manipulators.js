import { RolesManipulator } from './libs/actors_and_roles';
import { dragRole, stopCarryingRole, dropMugRole } from './role_sets/stage/stage_roles';
import { countExpensesRole } from './screens/gameplay/role_sets/faucets/faucets';
import { updateMoneyRole } from './screens/gameplay/role_sets/scoreBoard/scoreBoard';
import { rotateDayAndNightRole } from './screens/gameplay/role_sets/timeDisplay/timeDisplay';
import { generateMugsRole } from './screens/gameplay/role_sets/mugs/mugsOnLine/mugsOnLine';
import { fillMugsRole } from './screens/gameplay/role_sets/fillingMugs/fillingMugs';
import { manageTotalsRole } from './screens/gameplay/role_sets/totalsOnTable/totalsOnTable';
import { waitMugDisappearRole } from './screens/gameplay/role_sets/waitingMugs/waitingMugs';

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
  manageTotalsRole,
  rotateDayAndNightRole,
]);

startStopLevel.name = 'startStopLevel';
