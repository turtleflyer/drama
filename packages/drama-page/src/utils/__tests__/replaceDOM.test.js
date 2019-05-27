/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';

import replaceDOM from '../replaceDOM';

test('Test replaceDOM function', () => {
  const TestComponent = replaceDOM(() => {
    const element = document.createElement('div');
    element.id = 'injected-div';
    element.innerText = 'testing';
    return element;
  });
  document.body.innerHTML = '<div id="test-container" />';
  const composedDOM = ReactDOM.render(
    <div id="wrapper">
      <TestComponent />
    </div>,
    document.querySelector('#test-container'),
  );

  expect(composedDOM.id).toBe('wrapper');
  expect(composedDOM.children.length).toBe(1);
  expect(composedDOM.children[0].id).toBe('injected-div');
  expect(composedDOM.children[0].children.length).toBe(0);
  expect(composedDOM.children[0].innerText).toBe('testing');
});
