import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';

export default ({ data }) => (
  <Layout>
    <div dangerouslySetInnerHTML={{ __html: data.allMarkdownRemark.edges[0].node.html }} />
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          html
          headings {
            value
            depth
          }
          excerpt
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
