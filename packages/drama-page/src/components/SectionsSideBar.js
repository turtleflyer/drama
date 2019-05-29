import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { extractBeforeFirstSlash } from '../../pathModification';

const SidebarContainer = styled.nav`
  width: 180px;
  flex: initial;
`;

function sortEntries(list) {
  return Object.keys(list).sort((key1, key2) => list[key1].orderIndex - list[key2].orderIndex);
}

function SectionsSideBar({ data }) {
  const allSections = data.allMarkdownRemark.edges.reduce(
    (
      bringStructureMap,
      {
        node: {
          frontmatter: {
            parentTitle, title, orderIndex, noContent,
          },
          fields: { sectionPath },
        },
      },
    ) => {
      if (sectionPath.length === 0) {
        return bringStructureMap;
      }
      let conductStructureMap;
      const parentPathSegment = extractBeforeFirstSlash(sectionPath);
      const parentEntry = bringStructureMap[parentPathSegment] || { subsections: {} };
      if (parentTitle) {
        conductStructureMap = {
          ...bringStructureMap,
          [sectionPath]: {
            ...parentEntry,
            parentTitle,
            orderIndex,
            noContent: noContent && true,
          },
        };
      } else if (title) {
        conductStructureMap = {
          ...bringStructureMap,
          [parentPathSegment]: {
            ...parentEntry,
            subsections: { ...parentEntry.subsections, [sectionPath]: { title, orderIndex } },
          },
        };
      }
      return conductStructureMap;
    },
    {},
  );

  return (
    <SidebarContainer>
      <ul>
        {sortEntries(allSections).map((parentPath) => {
          const { parentTitle, subsections, noContent } = allSections[parentPath];
          return (
            <li key={parentPath}>
              <ul>
                {noContent ? parentTitle : <Link to={parentPath}>{parentTitle}</Link>}
                {sortEntries(subsections).map(sectionPath => (
                  <li key={sectionPath}>
                    <Link to={sectionPath}>{subsections[sectionPath].title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
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
                parentTitle
                orderIndex
                noContent
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
