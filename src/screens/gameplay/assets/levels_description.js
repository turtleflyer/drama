import { faucetModels } from './gameplay_params';

// eslint-disable-next-line
export const levelsDescription = [
  {
    mugsSpeed: -75,
    money: 100,
    loanExpenses: 0,
    initMugDensity: 4,
    faucets: [{ model: faucetModels.normalIPA, horizontalPosition: 140 }],
  },
  {
    mugsSpeed: -75,
    money: 100,
    loanExpenses: 0,
    initMugDensity: 4,
    faucets: [
      { model: faucetModels.normalIPA, horizontalPosition: 40 },
      { model: faucetModels.normalIPA, horizontalPosition: 190 },
    ],
  },
];
