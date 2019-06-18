import React, { useEffect, useContext } from 'react';
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

const LayoutContainer = flexContainer('div', {
  addContainerStyle: css`
    margin-top: 5rem;
    min-width: 768px;
    min-height: 75vh;
  `,
  addBoxStyle: css`
    align-items: flex-start;
  `,
});

const ContentContainer = ({ children }) => {
  const { sideBarOpen, scrollY } = useContext(ProvideLayoutState);

  useEffect(() => {
    if (!sideBarOpen && scrollY !== null) {
      window.scrollTo(0, scrollY);
    }
  }, [sideBarOpen, scrollY]);

  return (
    <main
      css={css`
        margin: 1rem auto 0;
        padding: 0px 1.3rem 1.5rem;
        flex: 1;
        z-index: 10;
        ${sideBarOpen
        ? css`
              position: fixed;
              width: 100%;
              ${scrollY
          ? css`
                    top: calc(5rem - ${scrollY}px);
                  `
          : css`
                    top: 0;
                  `}
            `
        : css`
              width: 0;
            `}
      `}
    >
      {children}
    </main>
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
              <>
                <Header siteTitle={data.site.siteMetadata.title} />
                <LayoutContainer>
                  {size === 'small' ? (
                    <SlideSideBar active={active} />
                  ) : (
                    <SectionsSideBar active={active} />
                  )}
                  <ContentContainer>{children}</ContentContainer>
                </LayoutContainer>
                <Footer>
                  {'©'}
                  {new Date().getFullYear()}
                  {', Built with '}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </Footer>
              </>
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
