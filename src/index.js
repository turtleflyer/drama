import { whenAllURLRetrieved } from './libs/session_storage_lib';
import { waitWhenTypeExhausted } from './libs/eventswork';
import { startLevel } from './stage/level_starter';
import './debug/stopButton';
import './debug/levelForm';
import './debug/resultButton';
import './debug/highlightZonesCheck';
import './stage/stage_roles';
import './stage/role_classes';
import './screens/gameplay/supersets/mugs';
import './screens/gameplay/supersets/dropPlaces';
import './screens/gameplay/supersets/draggable';
import './screens/gameplay/role_sets/faucets/faucets';
import './screens/gameplay/role_sets/fallenMug/fallenMug';
import './screens/gameplay/role_sets/faucetHandles/faucetHandles';
import './screens/gameplay/role_sets/damages/damages';
import './screens/gameplay/role_sets/timeDisplay/timeDisplay';
import './screens/gameplay/role_sets/staticDecorations/staticDecorations';
import './screens/gameplay/role_sets/resultOfGame/resultOfGame';
import './screens/gameplay/role_sets/scoreBoard/scoreBoard';
import './screens/gameplay/role_sets/totalsOnTable/totalsOnTable';
import './screens/gameplay/role_sets/customersReactions/customersReactions';
import './screens/gameplay/role_sets/waitingMugs/waitingMugs';
import './screens/gameplay/role_sets/whiskeyBottle/whiskeyBottle';

waitWhenTypeExhausted('onAddElement')
  .then(whenAllURLRetrieved)
  .then(() => startLevel(4));
