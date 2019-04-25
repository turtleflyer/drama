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
import Header from './header';
import './layout.css';
import SectionsSideBar from './SectionsSideBar';
import styled from '@emotion/styled';

const LayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  margin: 0px auto;
  width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  paddingtop: 0px;
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
                {size !== 'small' ? <SectionsSideBar /> : null}
                <ContentContainer>
                  <main>{children}</main>
                  <footer>
                    {'©'}
                    {new Date().getFullYear()}
                    {', Built with '}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                  </footer>
                </ContentContainer>
              </LayoutContainer>
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
