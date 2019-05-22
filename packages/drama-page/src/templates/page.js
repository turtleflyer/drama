import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import replaceDOM from '../utils/replaceDOM';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const {
      data: {
        markdownRemark: {
          frontmatter: { inject },
        },
      },
    } = this.props;
    import(/* webpackMode: "eager" */ `../pieces/${inject[0]}.js`).then(({ default: piece }) => {
      console.log('piece: ', piece);
      this.setState({ pieceComponent: replaceDOM(piece) });
    });
  }

  render() {
    const { pieceComponent: PieceComponent } = this.state;
    const {
      data: {
        markdownRemark: { html },
      },
    } = this.props;
    return (
      <>
        <Layout>
          {PieceComponent && <PieceComponent />}
          <div dangerouslySetInnerHTML={{ __html: html }} />
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
