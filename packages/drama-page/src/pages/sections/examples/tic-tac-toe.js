import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../../components/layout';

export default ({ data: { markdownRemark } }) => (
  <Layout>
    <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { sectionPath: { eq: $slug } }) {
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
`;
