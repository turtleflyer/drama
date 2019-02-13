import { ActorsSet } from '../../../../libs/actors_and_roles';
import Faucet from './FaucetClass';
import stage from '../../../../stage/stage';
import { onPulseTick } from '../../../../stage/role_classes';
import { damages } from '../damages/damages';
import { beerCost } from '../../../../stage/gameplay_params';
import { faucetsPlaces, switchTypes } from './faucets_params';
import { damagesParams } from '../damages/damages_params';
import { startStopRoles } from '../../../../roles_manipulators';
import { setA } from '../../supersets/setA';

function determineFaucetScheme(models) {
  const modelsTypes = models.map(f => f.switchType);
  const placedScheme = [];
  if (models.length === 1) {
    if (modelsTypes[0] === switchTypes.DUAL) {
      placedScheme.push(faucetsPlaces.centerDual);
    } else {
      placedScheme.push(faucetsPlaces.centerNormal);
    }
  } else if (models.length === 2) {
    if (modelsTypes[0] === switchTypes.DUAL) {
      placedScheme.push(faucetsPlaces.firstDualOfTwo);
    } else {
      placedScheme.push(faucetsPlaces.firstNormalOfTwo);
    }
    if (modelsTypes[1] === switchTypes.DUAL) {
      placedScheme.push(faucetsPlaces.secondDualOfTwo);
    } else {
      placedScheme.push(faucetsPlaces.secondNormalOfTwo);
    }
  } else {
    placedScheme.splice(
      0,
      0,
      faucetsPlaces.firstNormalOfThree,
      faucetsPlaces.centerNormal,
      faucetsPlaces.thirdNormalOfThree,
    );
  }
  console.log('placedScheme: ', placedScheme);
  return placedScheme;
}

// eslint-disable-next-line
export const faucets = new ActorsSet();
faucets.getInitializer(function () {
  const {
    params: {
      levelParams: {
        faucetsDescription: { models },
      },
    },
  } = stage;
  const placedScheme = determineFaucetScheme(models);
  models.forEach((faucet, i) => {
    this.addElement(new Faucet(faucet, placedScheme[i]));
  });
});

faucets.name = 'faucets';

export const countExpensesRole = onPulseTick.registerAction(faucets, {
  action({ target: faucet }) {
    const currTime = Date.now();
    const {
      state: stateOfFaucet,
      state: { descriptionOfRunningState, lastRenderedDamage },
    } = faucet;
    if (descriptionOfRunningState) {
      if (stateOfFaucet.lastTime) {
        stage.state.money
          -= ((currTime - stateOfFaucet.lastTime) / 1000) * beerCost[stateOfFaucet.beer];
      }
      stateOfFaucet.lastTime = currTime;
      const {
        place,
        place: {
          state: { placedMug },
        },
      } = descriptionOfRunningState;

      // Check if beer is wasting (condition of non existing or overfilled mug)
      if (!placedMug || placedMug.state.overfilled) {
        if (lastRenderedDamage) {
          const { whenStartToCount, alreadyCountedMoney } = lastRenderedDamage;
          const { quant } = damagesParams;
          // prettier-ignore
          const wastedMoney = ((currTime - whenStartToCount) / 1000)
            * beerCost[stateOfFaucet.beer];
          if (Math.floor(wastedMoney / quant) > Math.floor(alreadyCountedMoney / quant)) {
            damages.addDamage(place, Math.floor(wastedMoney / quant) % 2);
            lastRenderedDamage.alreadyCountedMoney = wastedMoney;
          }
        } else {
          stateOfFaucet.lastRenderedDamage = { whenStartToCount: currTime, alreadyCountedMoney: 0 };
        }
      } else {
        stateOfFaucet.lastRenderedDamage = null;
      }
    } else {
      stateOfFaucet.lastTime = null;
      stateOfFaucet.lastRenderedDamage = null;
    }
  },
});

startStopRoles.addElement(countExpensesRole);
setA.addElement(faucets);
