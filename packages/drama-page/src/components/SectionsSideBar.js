import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { extractBeforeFirstSlash } from '../../pathModification';

const SidebarContainer = styled.nav`
  width: 180px;
  flex: initial;
  position: sticky;
  z-index: 0.5;
  top: 5rem;
  left: 0;
  padding-top: 1rem;
`;

const ParentNavTitle = styled.div`
  text-transform: uppercase;
`;

const ActiveEntry = styled.span`
  color: #d64444;
`;

function sortEntries(list) {
  return Object.keys(list).sort((key1, key2) => list[key1].orderIndex - list[key2].orderIndex);
}

function SectionsSideBar({ data, active }) {
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
      <Global
        styles={css`
          nav {
            color: #a0a0a0;
          }

          nav a {
            color: #742a86;
            text-decoration: none;
          }

          nav ul {
            list-style: none;
            margin: 0.7em 0;
          }

          nav li {
            margin: 0 0 0.3em 0.4em;
          }
        `}
      />
      <ul>
        {sortEntries(allSections).map((parentPath) => {
          const { parentTitle, subsections, noContent } = allSections[parentPath];
          return (
            <li key={parentPath}>
              <ul>
                <ParentNavTitle>
                  {noContent ? (
                    parentTitle
                  ) : (
                    <Link to={parentPath}>
                      {parentPath === active ? (
                        <ActiveEntry>{parentTitle}</ActiveEntry>
                      ) : (
                        parentTitle
                      )}
                    </Link>
                  )}
                </ParentNavTitle>
                {sortEntries(subsections).map(sectionPath => (
                  <li key={sectionPath}>
                    <Link to={sectionPath}>
                      {sectionPath === active ? (
                        <ActiveEntry>{subsections[sectionPath].title}</ActiveEntry>
                      ) : (
                        subsections[sectionPath].title
                      )}
                    </Link>
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
