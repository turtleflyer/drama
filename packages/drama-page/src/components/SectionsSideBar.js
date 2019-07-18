import React, { useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { sideBar, global, backToTopButton } from '../utils/uiEnvironmentConstants';
import { sectionsStructure } from '../utils/sectionsStructure';
import BackToTopButton from './BackToTopButton';
import useScroll from '../utils/useScroll';

const ParentEntryTitle = styled.span`
  text-transform: uppercase;
  font-size: 110%;
`;

const ToggleActiveEntry = styled.span`
  display: block;
  padding: 0.2rem;
  &,
  li & {
    margin: 0.2rem 0;
  }
  ul li:first-of-type & {
    margin-top: 0;
  }
  ul > & {
    margin-bottom: 0;
  }
  width: 100%;
  ${({ activate }) => (activate
    ? css`
          background-color: ${sideBar.activeSectionColor};
        `
    : null)}
`;

const SidebarContainer = styled.nav`
  flex: initial;
  z-index: 15;
  top: ${global.headHeight};
  left: 0;
  padding: 1.5rem ${sideBar.horizontalPadding};
  background-color: white;
  overflow-y: auto;
  color: ${sideBar.noContentColor};
  line-height: 95%;
  ${({ fixed }) => (fixed
    ? css`
          position: fixed;
          width: ${sideBar.widthFixed};
          height: calc(100% - ${global.headHeight});
        `
    : css`
          width: ${sideBar.widthDefault};
        `)}
  a {
    color: ${sideBar.entryColor};
    text-decoration: none;
  }
  ul {
    list-style: none;
    margin: 0;
  }
  li {
    margin: 0;
  }
  & > ul li ul li {
    padding-left: ${sideBar.indent};
  }
  & > ul li ul {
    margin-top: 0.8rem;
  }
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
        title, noContent, path, propagatingProps: { active }, children,
      }) => (
        <li>
          <ul>
            <ToggleActiveEntry activate={active === path}>
              <ParentEntryTitle>
                {noContent ? title : <Link to={path}>{title}</Link>}
              </ParentEntryTitle>
            </ToggleActiveEntry>
            {children}
          </ul>
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
      ({ title, path, propagatingProps: { active } }) => (
        <li>
          <ToggleActiveEntry activate={active === path}>
            <Link to={path}>{title}</Link>
          </ToggleActiveEntry>
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
  const [toggleUpButton, setToggleUpButton] = useState(false);
  const containerRef = useRef();
  const rem = useMemo(() => parseInt(getComputedStyle(document.documentElement).fontSize, 10), []);

  const detectScrollEnough = () => {
    if (
      !fixed
      && containerRef.current
      && window.scrollY
        > containerRef.current.getBoundingClientRect().height
          - window.innerHeight
          + backToTopButton.verticalLengthDelay * rem
      && window.scrollY > window.innerHeight * backToTopButton.minScrollDelayRatio
    ) {
      if (!toggleUpButton) {
        setToggleUpButton(true);
      }
    } else if (toggleUpButton) {
      setToggleUpButton(false);
    }
  };

  detectScrollEnough();
  useScroll(detectScrollEnough, [fixed, toggleUpButton]);

  return (
    <>
      <SidebarContainer {...{ fixed }} ref={containerRef}>
        <SubsectionComponent subsections={allSections} propagatingProps={{ active }} />
        {toggleUpButton ? <BackToTopButton /> : null}
      </SidebarContainer>
    </>
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
