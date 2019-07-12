/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { css } from '@emotion/core';
import { goUpButton, sideBar, global } from '../utils/uiEnvironmentConstants';

const backToTop = () => {
  window.scrollTo(0, 0);
};

const BackToTopButton = () => (
  <div
    role="button"
    onClick={backToTop}
    css={css`
      width: ${goUpButton.size};
      height: ${goUpButton.size};
      border-radius: ${goUpButton.size};
      background-color: ${global.headerColor};
      position: fixed;
      top: calc(100% - ${goUpButton.size} - ${goUpButton.marginBottom});
      margin-left: calc(
        (${sideBar.widthDefault} - ${goUpButton.size}) / 2 - ${sideBar.horizontalPadding}
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
        margin-bottom: calc(${goUpButton.size} / 6);
        border-left: calc(${goUpButton.size} / 3.1) solid transparent;
        border-right: calc(${goUpButton.size} / 3.1) solid transparent;
        border-bottom: calc(${goUpButton.size} / 3.1) solid white;
      `}
    />
  </div>
);

export default BackToTopButton;
