import React from 'react';
import ticTacToe from '@drama-examples/tic-tac-toe';

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    ticTacToe(this.myRef.current);
  }

  render() {
    return <div ref={this.myRef} />;
  }
}
