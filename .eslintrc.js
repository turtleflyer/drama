module.exports = {
  extends: 'airbnb-base',
  rules: {
    'linebreak-style': ['warn', 'windows'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-multi-assign': 'off',
    'no-restricted-syntax': ['off', { selector: 'ForOfStatement' }],
  },
};
