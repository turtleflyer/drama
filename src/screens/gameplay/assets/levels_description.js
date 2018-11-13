import { faucetModels } from './gameplay_params';

export const commonInitState = {
  reputation: 1,
  drunkFactor: 0,
};

export const levelsDescription = [
  {
    params: {
      mugsSpeed: -75,
      loanExpenses: 0,
      initMugDensity: 4,
      faucets: [{ model: faucetModels.normalIPA, horizontalPosition: 140 }],
    },
    initState: {
      money: 100,
    },
  },
  {
    params: {
      mugsSpeed: -75,
      loanExpenses: 0,
      initMugDensity: 4,
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
