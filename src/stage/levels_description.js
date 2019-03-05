import { faucetModels } from '../screens/gameplay/role_sets/faucets/faucets_params';
import { beerTypes, glassType } from './gameplay_params';

export const commonInitState = {
  reputation: 1,
  drunkFactor: 1,
};

export const levelsDescription = {
  0: {
    params: {
      mugsSpeed: 75,
      initMugDensity: 3,
      remainingTime: 50,
      moneyToEarn: 80,
      faucetsDescription: {
        models: [faucetModels.normalIPA],
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
      initMugDensity: 3,
      remainingTime: 80,
      moneyToEarn: 160,
      faucetsDescription: {
        models: [faucetModels.normalIPA, faucetModels.normalLGR],
      },
      mugsDistribution: {
        [beerTypes.IPA]: 80,
        [beerTypes.LGR]: 20,
      },
    },
    initState: {
      money: 100,
    },
  },

  2: {
    params: {
      mugsSpeed: 75,
      initMugDensity: 3,
      remainingTime: 50,
      moneyToEarn: 140,
      faucetsDescription: {
        models: [faucetModels.normalPTR, faucetModels.brokenLGR],
      },
      mugsDistribution: {
        [beerTypes.LGR]: 35,
        [beerTypes.PTR]: 65,
      },
    },
    initState: {
      money: 100,
    },
  },

  3: {
    params: {
      mugsSpeed: 75,
      initMugDensity: 2,
      remainingTime: 50,
      moneyToEarn: 100,
      faucetsDescription: {
        models: [faucetModels.normalLGR],
      },
      mugsDistribution: {
        [beerTypes.LGR]: 60,
        [glassType]: 40,
      },
    },
    initState: {
      money: 50,
    },
  },

  4: {
    params: {
      mugsSpeed: 75,
      initMugDensity: 2,
      remainingTime: 70,
      moneyToEarn: 250,
      faucetsDescription: {
        models: [faucetModels.dualLGRPTR],
      },
      mugsDistribution: {
        [beerTypes.LGR]: 65,
        [beerTypes.PTR]: 35,
      },
    },
    initState: {
      money: 165,
    },
  },

  7: {
    params: {
      mugsSpeed: 75,
      initMugDensity: 2,
      remainingTime: 70,
      moneyToEarn: 250,
      faucetsDescription: {
        models: [
          faucetModels.dualLGRPTR,
          faucetModels.normalIPA
        ]
      },
      mugsDistribution: {
        [beerTypes.LGR]: 65,
        [beerTypes.PTR]: 35,
        [beerTypes.IPA]: 22,
        [glassType]: 22
      }
    },
    initState: {
      money: 165
    }
  },

  // 4: {
  //   params: {
  //     mugsSpeed: 75,
  //     initMugDensity: 4,
  //     remainingTime: 100,
  //     moneyToEarn: 300,
  //     faucetsDescription: {
  //       models: [faucetModels.dualIPALGR],
  //     },
  //     mugsDistribution: {
  //       [beerTypes.IPA]: 30,
  //       [beerTypes.LGR]: 70,
  //     },
  //   },
  //   initState: {
  //     money: 100,
  //   },
  // },

  // 5: {
  //   params: {
  //     mugsSpeed: 75,
  //     initMugDensity: 4,
  //     remainingTime: 100,
  //     moneyToEarn: 300,
  //     faucetsDescription: {
  //       models: [faucetModels.brokenLGR],
  //     },
  //     mugsDistribution: {
  //       [beerTypes.LGR]: 100,
  //     },
  //   },
  //   initState: {
  //     money: 100,
  //   },
  // },

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
      },
    },
    initState: {
      money: 100,
    },
  },
};
