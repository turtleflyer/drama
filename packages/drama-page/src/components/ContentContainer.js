import React, { useContext, useRef } from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { ProvideLayoutState } from './LayoutReducerProvider';
import { global } from '../utils/uiEnvironmentConstants';
import useScroll from '../utils/useScroll';

const ContentContainer = ({ children }) => {
  const { sideBarOpen, scrollY } = useContext(ProvideLayoutState);
  const layoutRef = useRef(null);

  useScroll(() => {
    if (sideBarOpen) {
      window.scrollTo(0, scrollY);
    }
  }, [scrollY, sideBarOpen]);

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
          padding: 1rem 1.3rem 0;
          flex: 1;
          z-index: 10;
          min-height: calc(
            100vh - ${global.headHeight} - ${global.footerHeight} - ${global.bottomNavigationHeight}
          );
          ${sideBarOpen
          ? css`
                position: fixed;
                width: 100%;
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
        {children}
      </main>
    </>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.node,
};

ContentContainer.defaultProps = {
  children: null,
};

export default ContentContainer;
