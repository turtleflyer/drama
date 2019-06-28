import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { ResponsiveContext, Grommet } from 'grommet';
import { css } from '@emotion/core';
import Header from './header';
import SectionsSideBar from './SectionsSideBar';
import flexContainer from '../utils/flexContainer';
import SlideSideBar from './SlideSideBar';
import GlobalStyle from './GlobalStyle';
import LayoutReducerProvider from './LayoutReducerProvider';
import { global } from '../utils/uiEnvironmentConstants';
import ContentContainer from './ContentContainer';

const LayoutContainer = flexContainer('div', {
  addContainerStyle: css`
    margin-top: ${global.headHeight};
  `,
  addBoxStyle: css`
    align-items: flex-start;
  `,
});

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
