import { ActorsSet } from '../../../libs/actors_and_roles';
import { mugs } from './mugs';
import { dragMug } from '../role_sets/dragMug';
import { faucets } from '../role_sets/faucets';
import { dropPlaces } from './dropPlaces';
import { fallenMug } from '../role_sets/fallenMug';
import { faucetHandles } from '../role_sets/faucetHandles';
import { waitingMugs } from '../role_sets/waitingMugs';
import { scoreBoard } from '../role_sets/scoreBoard';
import { damages } from '../role_sets/damages';
import { customersReactions } from '../role_sets/customersReactions';
import { totalsOnTable } from '../role_sets/totalsOnTable';
import { timeDisplay } from '../role_sets/timeDisplay/timeDisplay';
import { staticDecorations } from '../role_sets/staticDecorations/staticDecorations';
import { resultOfGame } from '../role_sets/resultOfGame/resultOfGame';

// eslint-disable-next-line
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
