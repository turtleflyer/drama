import React, { useContext, useRef, useEffect } from 'react';
import { css } from '@emotion/core';
import Footer from './Footer';
import { ProvideLayoutState } from './LayoutReducerProvider';

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

export default ContentContainer;
