import React from 'react';
import { graphql } from 'gatsby';

export default ({ data }) => (
  <div dangerouslySetInnerHTML={{ __html: data.allMarkdownRemark.edges[0].node.html }} />
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
