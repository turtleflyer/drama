/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

class Page extends React.Component {
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
    this.pieces = inject && inject.map(pieceKey => require(`../pieces/${pieceKey}.js`));
  }

  componentDidMount() {
    if (this.inject) {
      this.pieces.forEach((PieceComponent, i) => {
        const piecePlaceholder = this.markdownContainer.querySelector(`#${this.inject[i]}`);
        ReactDOM.render(<PieceComponent />, piecePlaceholder);
      });
    }
  }

  render() {
    const {
      data: {
        markdownRemark: {
          html,
          fields: { sectionPath },
        },
      },
    } = this.props;
    return (
      <>
        <Layout active={sectionPath}>
          <article
            dangerouslySetInnerHTML={{ __html: html }}
            ref={(el) => {
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
      fields {
        sectionPath
      }
    }
  }
`;

export default Page;
