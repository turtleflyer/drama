import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';

function SectionsSideBar({ data }) {
  return (
    <ul style={{ width: '10em' }}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <li key={node.fields.sectionPath}>
          <Link to={node.fields.sectionPath}>{node.frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                sectionPath
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={data => <SectionsSideBar data={data} {...props} />}
  />
);
