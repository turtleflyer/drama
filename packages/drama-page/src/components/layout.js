/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { ResponsiveContext, Grommet } from 'grommet';
import styled from '@emotion/styled';
import Header from './header';
import SectionsSideBar from './SectionsSideBar';

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 768px;
`;

const LayoutBox = styled.div`
  width: 960px;
  display: flex;
`;

const ContentContainer = styled.main`
  margin: 0px auto;
  padding: 0px 1.0875rem 1.45rem;
  flex: 1;
  width: 0;
`;

const Layout = ({ children }) => (
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
        <ResponsiveContext.Consumer>
          {size => (
            <>
              <Header siteTitle={data.site.siteMetadata.title} />
              <LayoutContainer>
                <LayoutBox>
                  {size !== 'small' ? <SectionsSideBar /> : null}
                  <ContentContainer>{children}</ContentContainer>
                </LayoutBox>
              </LayoutContainer>
              <footer>
                {'©'}
                {new Date().getFullYear()}
                {', Built with '}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
              </footer>
            </>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
