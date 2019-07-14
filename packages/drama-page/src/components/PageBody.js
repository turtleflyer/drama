import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { ResponsiveContext } from 'grommet';
import PropTypes from 'prop-types';
import Header from './header';
import FlexContainer from './FlexContainer';
import SlideSideBar from './SlideSideBar';
import SectionsSideBar from './SectionsSideBar';
import ContentContainer from './ContentContainer';
import Footer from './Footer';
import { global } from '../utils/uiEnvironmentConstants';
import { ProvideLayoutDispatch, CLOSE_SIDE_BAR } from './LayoutReducerProvider';
import PrevNextNavigation from './PrevNextNavigation';

const PageBody = ({ children, active, data }) => {
  const size = useContext(ResponsiveContext);
  const dispatch = useContext(ProvideLayoutDispatch);
  if (size !== 'small') {
    dispatch({ type: CLOSE_SIDE_BAR });
  }

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} narrow={size === 'small'} />
      <FlexContainer
        addContainerStyle={css`
          margin-top: ${global.headHeight};
        `}
        addBoxStyle={css`
          align-items: flex-start;
        `}
      >
        {size === 'small' ? <SlideSideBar active={active} /> : <SectionsSideBar active={active} />}
        <ContentContainer>{children}</ContentContainer>
      </FlexContainer>
      <PrevNextNavigation narrow={size === 'small'} {...{ active }} />
      <Footer narrow={size === 'small'}>
        {'©'}
        {new Date().getFullYear()}
        {', Built with '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </>
  );
};

PageBody.propTypes = {
  children: PropTypes.node,
  active: PropTypes.string.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

PageBody.defaultProps = {
  children: null,
};

export default PageBody;
