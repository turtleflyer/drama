import { faucetModels } from '../screens/gameplay/role_sets/faucets/faucets_params';
import { beerTypes, glassType } from './gameplay_params';

const placedFaucetsSchemes = {
  oneNormal: [0],
  twoNormals: [1, 2],
  threeNormals: [3, 0, 4],
};

export const commonInitState = {
  reputation: 1,
  drunkFactor: 1,
};

export const levelsDescription = {
  0: {
    params: {
      mugsSpeed: 75,
      initMugDensity: 4,
      remainingTime: 50,
      moneyToEarn: 150,
      faucetsDescription: {
        models: [faucetModels.normalIPA],
        placedScheme: placedFaucetsSchemes.oneNormal,
      },
      mugsDistribution: {
        [beerTypes.IPA]: 100,
      },
    },
    initState: {
      money: 50,
    },
  },
  1: {
    params: {
      mugsSpeed: 75,
      initMugDensity: 4.5,
      remainingTime: 80,
      moneyToEarn: 400,
      faucetsDescription: {
        models: [faucetModels.normalIPA, faucetModels.normalPTR],
        placedScheme: placedFaucetsSchemes.twoNormals,
      },
      mugsDistribution: {
        [beerTypes.IPA]: 80,
        [beerTypes.PTR]: 20,
      },
    },
    initState: {
      money: 100,
    },
  },
  2: {
    params: {
      mugsSpeed: 75,
      initMugDensity: 4,
      remainingTime: 50,
      moneyToEarn: 300,
      faucetsDescription: {
        models: [faucetModels.normalIPA],
        placedScheme: placedFaucetsSchemes.oneNormal,
      },
      mugsDistribution: {
        [beerTypes.IPA]: 50,
        [glassType]: 50,
      },
    },
    initState: {
      money: 100,
    },
  },
  3: {
    params: {
      mugsSpeed: 75,
      initMugDensity: 4,
      remainingTime: 50,
      moneyToEarn: 300,
      faucetsDescription: {
        models: [faucetModels.normalIPA, faucetModels.normalLGR, faucetModels.normalPTR],
        placedScheme: placedFaucetsSchemes.threeNormals,
      },
      mugsDistribution: {
        [beerTypes.IPA]: 40,
        [beerTypes.LGR]: 50,
        [beerTypes.PTR]: 60,
      },
    },
    initState: {
      money: 100,
    },
  },

  /**
   * For debugging purpose
   */
  100: {
    params: {
      mugsSpeed: 30,
      initMugDensity: 10,
      remainingTime: Infinity,
      moneyToEarn: Infinity,
      faucetsDescription: {
        models: [faucetModels.normalIPA],
        placedScheme: placedFaucetsSchemes.oneNormal,
      },
    },
    initState: {
      money: 100,
    },
  },
};
