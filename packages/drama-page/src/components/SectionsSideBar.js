import React from 'react';
import PropTypes from 'prop-types';
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
        {data.allMarkdownRemark.edges.map(({ node }) => (node.frontmatter.title || node.frontmatter.sectionTitle ? (
          <li key={node.fields.sectionPath}>
            {node.frontmatter.title ? (
              <Link to={node.fields.sectionPath}>{node.frontmatter.title}</Link>
            ) : (
              node.frontmatter.sectionTitle
            )}
          </li>
        ) : null))}
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
                sectionTitle
              }
            }
          }
        }
      }
    `}
    render={data => <SectionsSideBar data={data} {...props} />}
  />
);

SectionsSideBar.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            fields: PropTypes.shape({
              sectionPath: PropTypes.string.isRequired,
            }).isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
