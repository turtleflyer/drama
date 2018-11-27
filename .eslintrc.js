module.exports = {
  extends: 'airbnb-base',
  rules: {
    'linebreak-style': ['off'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-multi-assign': 'off',
    'no-restricted-syntax': ['off', { selector: 'ForOfStatement' }],
    'no-plusplus': 'off',
  },
};
