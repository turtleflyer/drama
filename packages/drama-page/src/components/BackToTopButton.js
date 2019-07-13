/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { css } from '@emotion/core';
import { backToTopButton, sideBar, global } from '../utils/uiEnvironmentConstants';

const backToTop = () => {
  window.scrollTo(0, 0);
};

const BackToTopButton = () => (
  <div
    role="button"
    onClick={backToTop}
    css={css`
      width: ${backToTopButton.size};
      height: ${backToTopButton.size};
      border-radius: ${backToTopButton.size};
      background-color: ${global.headerColor};
      position: fixed;
      top: calc(100% - ${backToTopButton.size} - ${backToTopButton.marginBottom});
      margin-left: calc(
        (${sideBar.widthDefault} - ${backToTopButton.size}) / 2 - ${sideBar.horizontalPadding}
      );
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  >
    <div
      css={css`
        width: 0;
        height: 0;
        margin-bottom: calc(${backToTopButton.size} / 6);
        border-left: calc(${backToTopButton.size} / 3.1) solid transparent;
        border-right: calc(${backToTopButton.size} / 3.1) solid transparent;
        border-bottom: calc(${backToTopButton.size} / 3.1) solid white;
      `}
    />
  </div>
);

export default BackToTopButton;
