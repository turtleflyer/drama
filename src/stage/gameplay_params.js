export const stageDimension = {
  width: 1024,
  height: 640,
};

export const tuneGame = {
  reputationDecrement: -0.15,
  reputationIncrement: 0.06,
  drunkFactorIncrement: 0.02,
  beerMarkup: 3.5,
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
