/* eslint-env browser */
import { importAll } from '../../../../libs/helpers_lib';

export const customersReactionsParams = {
  position: {
    width: 150,
    left: 10,
    top: 50,
  },
};

export const customerReactionsTypes = {
  OK: '@@customerReactionsTypes/OK',
  TOO_FEW: '@@customerReactionsTypes/TOO_FEW',
  WRONG_BEER: '@@customerReactionsTypes/WRONG_BEER',
};

export const customerReactionsImgs = importAll(require.context('./img', false, /\.png$/)).reduce(
  (imgs, r, i) => Object.assign(imgs, { [Object.values(customerReactionsTypes)[i]]: r }),
  {},
);
