import React from 'react';

export default function replaceDOM(buildDOM) {
  return class TicTacToe extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }

    componentDidMount() {
      const DOM = buildDOM();
      const placeholder = this.myRef.current;
      placeholder.parentNode.replaceChild(DOM, placeholder);
    }

    render() {
      return <div ref={this.myRef} />;
    }
  };
}
