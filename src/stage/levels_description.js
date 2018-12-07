import { faucetModels } from '../screens/gameplay/role_sets/faucets/faucets_params';

export const commonInitState = {
  reputation: 1,
  drunkFactor: 1,
};

export const levelsDescription = [
  {
    params: {
      mugsSpeed: 75,
      initMugDensity: 4,
      remainingTime: 50,
      moneyToEarn: 300,
      faucets: [{ model: faucetModels.normalIPA, horizontalPosition: 140 }],
    },
    initState: {
      money: 100,
    },
  },
  {
    params: {
      mugsSpeed: 75,
      initMugDensity: 4.5,
      remainingTime: 60,
      moneyToEarn: 600,
      faucets: [
        { model: faucetModels.normalIPA, horizontalPosition: 40 },
        { model: faucetModels.normalIPA, horizontalPosition: 190 },
      ],
    },
    initState: {
      money: 100,
    },
  },
];

/**
 * For debugging purpose
 */
levelsDescription[100] = {
  params: {
    mugsSpeed: 30,
    initMugDensity: 10,
    remainingTime: Infinity,
    moneyToEarn: Infinity,
    faucets: [{ model: faucetModels.normalIPA, horizontalPosition: 140 }],
  },
  initState: {
    money: 100,
  },
};
