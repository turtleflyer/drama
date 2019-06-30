import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Grommet } from 'grommet';
import GlobalStyle from './GlobalStyle';
import LayoutReducerProvider from './LayoutReducerProvider';
import PageBody from './PageBody';

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
        <LayoutReducerProvider>
          <GlobalStyle />
          <PageBody {...{ children, active, data }} />
        </LayoutReducerProvider>
      </Grommet>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node,
  active: PropTypes.string.isRequired,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
