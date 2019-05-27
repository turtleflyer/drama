const babelOptions = {
  presets: ['gatsby'],
  plugins: [
    [
      '@babel/plugin-transform-spread',
      {
        loose: false,
      },
    ],
  ],
};
// eslint-disable-next-line
module.exports = require('babel-jest').createTransformer(babelOptions);
