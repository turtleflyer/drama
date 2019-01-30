import stage from '../../../../../stage/stage';
import { tuneGame } from '../../../../../stage/gameplay_params';

export default function* mugTypesGenerator() {
  const {
    params: {
      levelParams: { mugsDistribution },
    },
  } = stage;
  const { sequenceLengthDistrToBeConsistent, distributionCoefficientAdjustment } = tuneGame;
  const lastSequence = [];
  let stop = false;

  while (!stop) {
    if (Object.keys(mugsDistribution).length === 1) {
      stop = yield Object.keys(mugsDistribution)[0];
    } else {
      const currentDistribution = lastSequence.reduce(
        (distr, type) => {
          Object.keys(distr).forEach((key) => {
            if (key === type) {
              distr[key] -= (1 - mugsDistribution[key]) * distributionCoefficientAdjustment;
            } else {
              distr[key] += mugsDistribution[key] * distributionCoefficientAdjustment;
            }
          });
          return distr;
        },
        { ...mugsDistribution },
      );

      let rndm = Math.random();
      let getType;
      const sortedDistr = Object.entries(currentDistribution).sort(
        (entr1, entr2) => entr2[1] - entr1[1],
      );
      for (const [type, prob] of sortedDistr) {
        rndm -= prob;
        if (rndm < 0) {
          getType = type;
          break;
        }
      }

      lastSequence.push(getType);

      if (lastSequence.length > sequenceLengthDistrToBeConsistent) {
        lastSequence.shift();
      }

      stop = yield getType;
    }
  }
}
