import { ActorsSet } from '../../../libs/actors_and_roles';
import { mugs } from './mugs';
import { dragMug } from '../role_sets/dragMug/dragMug';
import { faucets } from '../role_sets/faucets/faucets';
import { dropPlaces } from './dropPlaces';
import { fallenMug } from '../role_sets/fallenMug/fallenMug';
import { faucetHandles } from '../role_sets/faucetHandles/faucetHandles';
import { damages } from '../role_sets/damages/damages';
import { timeDisplay } from '../role_sets/timeDisplay/timeDisplay';
import { staticDecorations } from '../role_sets/staticDecorations/staticDecorations';
import { resultOfGame } from '../role_sets/resultOfGame/resultOfGame';
import { onResize } from '../../../assets/role_classes';
import { scoreBoard } from '../role_sets/scoreBoard/scoreBoard';
import { totalsOnTable } from '../role_sets/totalsOnTable/totalsOnTable';
import { customersReactions } from '../role_sets/customersReactions/customersReactions';
import { waitingMugs } from '../role_sets/waitingMugs/waitingMugs';

export const setA = new ActorsSet([
  mugs,
  dragMug,
  fallenMug,
  faucets,
  faucetHandles,
  dropPlaces,
  waitingMugs,
  scoreBoard,
  damages,
  customersReactions,
  totalsOnTable,
  timeDisplay,
  staticDecorations,
  resultOfGame,
]);

setA.name = 'setA';

export const resizeEverythingRole = onResize
  .registerAction(setA, {
    action({ target, event: { scaleF } }) {
      if (target.node) {
        // console.log('target: ', target);
        target.refreshScaleF(scaleF);
      }
    },
  })
  .start();
