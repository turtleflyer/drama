if (typeof document !== 'undefined') {
  const { default: replaceDOM } = module.require('../utils/replaceDOM');
  const { default: ticTacToe } = module.require('@drama-examples/tic-tac-toe');
  module.exports = replaceDOM(ticTacToe);
} else {
  module.exports = () => null;
}
