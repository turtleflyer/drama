import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { sideBar, global } from '../utils/uiEnvironmentConstants';
import sectionsStructure from '../utils/sectionsStructure';

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

function SectionsSideBar({ data, active, fixed }) {
  const allSections = sectionsStructure(data.allMarkdownRemark.edges);

  const insideBar = (
    <ul>
      {Object.keys(allSections).map((parentPath) => {
        const { title, subsections, noContent } = allSections[parentPath];
        return (
          <li key={parentPath}>
            <ul>
              <div
                css={css`
                  text-transform: uppercase;
                `}
              >
                {noContent ? (
                  title
                ) : (
                  <Link to={parentPath}>
                    {parentPath === active ? <ActiveEntry>{title}</ActiveEntry> : title}
                  </Link>
                )}
              </div>
              {Object.keys(subsections).map(sectionPath => (
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
