import React, { useMemo } from 'react';
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

function getSubsectionComponent(componentsOfDepth, exception = () => false) {
  function ComponentOfDepth({ depth, ...props }) {
    const Component = componentsOfDepth[depth];
    return <Component {...props} />;
  }

  ComponentOfDepth.propTypes = {
    depth: PropTypes.number.isRequired,
  };

  function Subsection({
    subsections, depth = 0, propagatingProps, ...props
  }) {
    const actualDepth = exception(depth, subsections) || depth;
    return actualDepth < componentsOfDepth.length ? (
      <ComponentOfDepth depth={actualDepth} {...{ propagatingProps, ...props }}>
        {subsections && typeof subsections === 'object' && !Array.isArray(subsections)
          ? Object.keys(subsections).map(path => (
            <Subsection
              key={path}
              {...subsections[path]}
              depth={actualDepth + 1}
              {...{ propagatingProps, path }}
            />
          ))
          : null}
      </ComponentOfDepth>
    ) : null;
  }

  Subsection.propTypes = {
    subsections: PropTypes.objectOf(
      PropTypes.shape({
        title: PropTypes.string,
        noContent: PropTypes.bool,
        subsections: PropTypes.object,
      }).isRequired,
    ),
    depth: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    propagatingProps: PropTypes.any,
  };

  Subsection.defaultProps = {
    subsections: undefined,
    depth: 0,
    propagatingProps: undefined,
  };

  return Subsection;
}

const SubsectionComponent = getSubsectionComponent(
  [
    Object.assign(({ children }) => <ul>{children}</ul>, {
      propTypes: { children: PropTypes.node },
      defaultProps: { children: null },
    }),

    Object.assign(
      ({
        title, noContent, path, propagatingProps: { active: activeSection }, children,
      }) => (
        <li>
          <div
            css={css`
              text-transform: uppercase;
            `}
          >
            {noContent ? (
              title
            ) : (
              <Link to={path}>
                {path === activeSection ? <ActiveEntry>{title}</ActiveEntry> : title}
              </Link>
            )}
          </div>
          <ul>{children}</ul>
        </li>
      ),
      {
        propTypes: {
          title: PropTypes.string.isRequired,
          noContent: PropTypes.bool.isRequired,
          propagatingProps: PropTypes.exact({
            active: PropTypes.string.isRequired,
          }).isRequired,
          children: PropTypes.node,
        },
        defaultProps: { children: undefined },
      },
    ),

    Object.assign(
      ({ title, path, propagatingProps: { active: activeSection } }) => (
        <li>
          <Link to={path}>
            {path === activeSection ? <ActiveEntry>{title}</ActiveEntry> : title}
          </Link>
        </li>
      ),
      {
        propTypes: {
          title: PropTypes.string.isRequired,
          propagatingProps: PropTypes.exact({
            active: PropTypes.string.isRequired,
          }).isRequired,
          children: PropTypes.node,
        },
        defaultProps: { children: undefined },
      },
    ),
  ],

  (depth, subsections) => (depth === 1 && !subsections ? 2 : false),
);

function SectionsSideBar({ data, active, fixed }) {
  const allSections = useMemo(() => sectionsStructure(data.allMarkdownRemark.edges), [data]);

  return (
    <SidebarContainer {...{ fixed }}>
      <SubsectionComponent subsections={allSections} propagatingProps={{ active }} />
    </SidebarContainer>
  );
}

SectionsSideBar.propTypes = {
  data: PropTypes.exact({
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
