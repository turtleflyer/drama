import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { ResponsiveContext, Grommet } from 'grommet';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/core';
import Header from './header';
import SectionsSideBar from './SectionsSideBar';
import Footer from './Footer';
import flexContainer from '../utils/flexContainer';

const LayoutContainer = flexContainer('div', {
  addContainerStyle: css`
    min-width: 768px;
    min-height: 75vh;
  `,
  addBoxStyle: css`
    align-items: flex-start;
  `,
});

const ContentContainer = styled.main`
  margin: 0px auto;
  padding: 0px 1.3rem 1.5rem;
  flex: 1;
  width: 0;
`;

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
        <Global
          styles={css`
            html,
            body {
              height: 100%;
            }
          `}
        />
        <ResponsiveContext.Consumer>
          {size => (
            <>
              <Header siteTitle={data.site.siteMetadata.title} />
              <LayoutContainer>
                {size !== 'small' ? <SectionsSideBar active={active} /> : null}
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
