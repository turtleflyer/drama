import React from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    const {
      data: {
        markdownRemark: {
          frontmatter: { inject },
        },
      },
    } = this.props;
    this.inject = inject;
    this.pieces =
      inject &&
      inject.map(pieceKey => import(/* webpackMode: "eager" */ `../pieces/${pieceKey}.js`));
  }

  componentDidMount() {
    if (this.inject) {
      Promise.all(this.pieces).then(pieces => {
        pieces.forEach(({ default: PieceComponent }, i) => {
          const piecePlaceholder = this.markdownContainer.querySelector(`#${this.inject[i]}`);
          ReactDOM.render(<PieceComponent />, piecePlaceholder);
        });
      });
    }
  }

  render() {
    const {
      data: {
        markdownRemark: { html },
      },
    } = this.props;
    return (
      <>
        <Layout>
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            ref={el => {
              this.markdownContainer = el;
            }}
          />
        </Layout>
      </>
    );
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { sectionPath: { eq: $slug } }) {
      html
      frontmatter {
        inject
      }
    }
  }
`;
