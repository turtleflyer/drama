/* eslint-env jest */
/* eslint-disable global-require */

let React;
let ReactDOM;
let replaceDOM;

describe('Test replaceDOM function', () => {
  beforeEach(() => {
    React = require('react');
    ReactDOM = require('react-dom');
    replaceDOM = require('../replaceDOM').default;
  });

  test('rendered right', () => {
    const TestComponent = replaceDOM(() => {
      const element = document.createElement('div');
      element.id = 'injected-div';
      element.innerHTML = '<div>testing</div>';
      return element;
    });
    const container = document.createElement('div');
    ReactDOM.render(<TestComponent />, container);

    expect(container.innerHTML).toBe('<div id="injected-div"><div>testing</div></div>');
  });
});
