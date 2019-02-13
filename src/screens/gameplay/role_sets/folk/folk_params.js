import { importAll } from '../../../../libs/helpers_lib';
import { imagesDataURL } from '../../../../libs/session_storage_lib';

// eslint-disable-next-line
export const folkParams = {
  position: {
    right: 38,
    bottom: 251,
    width: 488,
  },
  img: importAll(require.context('./img', false, /\.png$/)).map((img) => {
    imagesDataURL.addElement(img);
    return img;
  }),
  drunkBrackets: [1.15, 1.3],
};
