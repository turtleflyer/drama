import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { ResponsiveContext, Grommet } from 'grommet';
import { css } from '@emotion/core';
import Header from './header';
import SectionsSideBar from './SectionsSideBar';
import Footer from './Footer';
import flexContainer from '../utils/flexContainer';
import SlideSideBar from './SlideSideBar';
import GlobalStyle from './GlobalStyle';
import LayoutReducerProvider, { ProvideLayoutState } from './LayoutReducerProvider';
import { global } from '../utils/uiEnvironmentConstants';

const LayoutContainer = flexContainer('div', {
  addContainerStyle: css`
    margin-top: ${global.headHeight};
  `,
  addBoxStyle: css`
    align-items: flex-start;
  `,
});

const ContentContainer = ({ children }) => {
  const { sideBarOpen, scrollY } = useContext(ProvideLayoutState);
  const layoutRef = useRef(null);

  const stayOnScrollPosition = () => {
    window.scrollTo(0, scrollY);
  };

  useEffect(() => {
    if (sideBarOpen) {
      window.addEventListener('scroll', stayOnScrollPosition);
      return () => {
        window.removeEventListener('scroll', stayOnScrollPosition);
        window.scrollTo(0, scrollY);
      };
    }
  }, [sideBarOpen, scrollY]);

  return (
    <>
      {sideBarOpen ? (
        <div
          css={css`
            height: ${layoutRef.current.getBoundingClientRect().height}px;
            width: 0;
          `}
        />
      ) : null}
      <main
        css={css`
          margin: 0 auto;
          padding: 0 1.3rem;
          flex: 1;
          z-index: 10;
          ${sideBarOpen
          ? css`
                position: fixed;
                width: 100%;
                filter: blur(5px);
                ${typeof scrollY === 'number'
            ? css`
                      top: calc(${global.headHeight} - ${scrollY}px);
                    `
            : css`
                      top: 0;
                    `}
              `
          : css`
                width: 0;
              `}
        `}
        ref={layoutRef}
      >
        <div
          css={css`
            min-height: calc(100vh - 8rem);
            padding-top: 1rem;
          `}
        >
          {children}
        </div>
        <Footer>
          {'©'}
          {new Date().getFullYear()}
          {', Built with '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Footer>
      </main>
    </>
  );
};

const Layout = ({ children, active }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Grommet>
        <GlobalStyle />
        <LayoutReducerProvider>
          <ResponsiveContext.Consumer>
            {size => (
              <div
                css={css`
                  min-height: calc(100vh - ${global.headHeight});
                `}
              >
                <Header siteTitle={data.site.siteMetadata.title} />
                <LayoutContainer>
                  {size === 'small' ? (
                    <SlideSideBar active={active} />
                  ) : (
                    <SectionsSideBar active={active} />
                  )}
                  <ContentContainer>{children}</ContentContainer>
                </LayoutContainer>
              </div>
            )}
          </ResponsiveContext.Consumer>
        </LayoutReducerProvider>
      </Grommet>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  active: PropTypes.string.isRequired,
};

Layout.defaultProps = {
  children: [],
};

export default Layout;
