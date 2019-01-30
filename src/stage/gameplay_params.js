export const stageDimension = {
  width: 1024,
  height: 640,
};

export const tuneGame = {
  reputationDecrement: -0.15,
  reputationIncrement: 0.06,
  drunkFactorIncrement: 0.02,
  beerMarkup: 3.5,

  // With following parameters if probability of appearance of a mug is 0.15
  // then max possible existence in the sequence is 1 (no more than 1 existence).
  // 0.25 - after 5 missing in sequence probability is 1 (obligatory 1 existence
  // after empty sequence);
  // 0.3 - after existence of 2 instances probability is 0 (no more than 2 existence).
  // 0.4 - after 4 missing in sequence probability is 1 (obligatory 1 existence
  // after no more then 1 in sequence);
  // 0.425 - after 3 missing in sequence probability is 0.5;
  sequenceLengthDistrToBeConsistent: 5,
  distributionCoefficientAdjustment: 0.6,
};

export const defaultFontSize = 14;

export const beerTypes = {
  IPA: '@@beerTypes/IPA',
  LGR: '@@beerTypes/LGR',
  PTR: '@@beerTypes/PTR',
};

export const glassType = '@@glassType';

export const beerCost = { [beerTypes.IPA]: 2.5, [beerTypes.LGR]: 2, [beerTypes.PTR]: 3.5 };

export const pulseTimeout = 16;
