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
  const currentDistribution = { ...mugsDistribution };

  while (!stop) {
    if (Object.keys(mugsDistribution).length === 1) {
      stop = yield Object.keys(mugsDistribution)[0];
    } else {
      const lastType = lastSequence[lastSequence.length - 1];
      if (lastType) {
        if (lastSequence.length > sequenceLengthDistrToBeConsistent) {
          const oldestType = lastSequence.shift();
          currentDistribution[oldestType] += distributionCoefficientAdjustment;
        } else {
          Object.keys(mugsDistribution).forEach((type) => {
            currentDistribution[type] += mugsDistribution[type] * distributionCoefficientAdjustment;
          });
        }
        currentDistribution[lastType] -= distributionCoefficientAdjustment;
      }

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

      stop = yield getType;
    }
  }
}
