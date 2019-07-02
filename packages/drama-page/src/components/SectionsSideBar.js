import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { extractBeforeFirstSlash } from '../../pathModification';
import { sideBar, global } from '../utils/uiEnvironmentConstants';

const SidebarContainer = styled.nav`
  flex: initial;
  z-index: 15;
  top: ${global.headHeight};
  left: 0;
  padding-top: 1rem;
  background-color: white;
  overflow-y: auto;
  ${({ fixed }) => (fixed
    ? css`
          position: fixed;
          width: ${sideBar.widthFixed};
          height: 100%;
        `
    : css`
          width: ${sideBar.widthDefault};
          top-margin: ${global.headHeight};
        `)}
`;

const ActiveEntry = styled.span`
  color: ${sideBar.activeSectionColor};
`;

function sortEntries(list) {
  return Object.keys(list).sort((key1, key2) => list[key1].orderIndex - list[key2].orderIndex);
}

function SectionsSideBar({ data, active, fixed }) {
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

  const insideBar = (
    <ul>
      {sortEntries(allSections).map((parentPath) => {
        const { parentTitle, subsections, noContent } = allSections[parentPath];
        return (
          <li key={parentPath}>
            <ul>
              <div
                css={css`
                  text-transform: uppercase;
                `}
              >
                {noContent ? (
                  parentTitle
                ) : (
                  <Link to={parentPath}>
                    {parentPath === active ? <ActiveEntry>{parentTitle}</ActiveEntry> : parentTitle}
                  </Link>
                )}
              </div>
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
  );

  return <SidebarContainer {...{ fixed }}>{insideBar}</SidebarContainer>;
}

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
  active: PropTypes.string.isRequired,
  fixed: PropTypes.bool,
};

SectionsSideBar.defaultProps = {
  fixed: false,
};

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
