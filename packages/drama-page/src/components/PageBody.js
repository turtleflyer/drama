import React, { useContext, useEffect } from 'react';
import { css } from '@emotion/core';
import { ResponsiveContext } from 'grommet';
import Header from './header';
import FlexContainer from './FlexContainer';
import SlideSideBar from './SlideSideBar';
import SectionsSideBar from './SectionsSideBar';
import ContentContainer from './ContentContainer';
import Footer from './Footer';
import { global } from '../utils/uiEnvironmentConstants';
import { ProvideLayoutDispatch, CLOSE_SIDE_BAR } from './LayoutReducerProvider';

const PageBody = ({ children, active, data }) => {
  const size = useContext(ResponsiveContext);
  const dispatch = useContext(ProvideLayoutDispatch);

  useEffect(() => {
    if (size !== 'small') {
      dispatch({ type: CLOSE_SIDE_BAR });
    }
  }, [size, dispatch]);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
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
      <Footer>
        {'©'}
        {new Date().getFullYear()}
        {', Built with '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </>
  );
};

export default PageBody;
