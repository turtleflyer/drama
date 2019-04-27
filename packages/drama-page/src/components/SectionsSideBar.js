import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';

const SidebarContainer = styled.nav`
  width: 180px;
  flex: initial;
`;

function SectionsSideBar({ data }) {
  return (
    <SidebarContainer>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.fields.sectionPath}>
            <Link to={node.fields.sectionPath}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </SidebarContainer>
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
