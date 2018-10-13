import { commonParams, startModules, getUnit } from './gamelibrary';
import MugsOnLine from './units/MugsOnLine';
import DragMug from './units/DragMug';
import FallenMug from './units/FallenMug';
import Faucets from './units/Faucets';
import FaucetSwitches from './units/FaucetSwitches';
import MugPlaces from './units/MugPlaces';
import BeerJet from './units/BeerJet';
import Damages from './units/Damages';
import MugFilling from './units/MugFilling';
import CustomersTable from './units/CustomersTable';
import MugWaiting from './units/MugWaiting';
import Score from './units/Score';
import Mugs from './powerUnits/Mugs';
import DropPlaces from './powerUnits/DropPlaces';

// eslint-disable-next-line
export function startLevel(level) {
  commonParams.level = level;
  startModules(
    MugsOnLine,
    DragMug,
    FallenMug,
    Faucets,
    FaucetSwitches,
    MugPlaces,
    BeerJet,
    Damages,
    MugFilling,
    CustomersTable,
    MugWaiting,
    Score,
    Mugs,
    DropPlaces,
  );
  const Scene = getUnit('Scene');
  if (Scene) {
    const { description } = Scene;
    description.initialize.start();
    description.toTerminate = false;
  }
}
