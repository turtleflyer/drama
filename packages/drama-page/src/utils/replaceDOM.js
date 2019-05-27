import React from 'react';

export default function replaceDOM(buildDOM) {
  return class Replaced extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }

    componentDidMount() {
      this.placeholder.parentNode.replaceChild(buildDOM(), this.placeholder);
    }

    render() {
      return (
        <div
          ref={(el) => {
            this.placeholder = el;
          }}
        />
      );
    }
  };
}
