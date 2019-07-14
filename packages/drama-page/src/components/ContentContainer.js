import React, { useContext, useRef, useEffect } from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { ProvideLayoutState } from './LayoutReducerProvider';
import { global } from '../utils/uiEnvironmentConstants';

const ContentContainer = ({ children }) => {
  const { sideBarOpen, scrollY } = useContext(ProvideLayoutState);
  const layoutRef = useRef(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const stayOnScrollPosition = () => {
      window.scrollTo(0, scrollY);
    };

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
