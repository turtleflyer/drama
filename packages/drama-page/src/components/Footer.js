import React from 'react';
import { PropTypes } from 'prop-types';
import { css } from '@emotion/core';
import FlexContainer from './FlexContainer';
import { sideBar } from '../utils/uiEnvironmentConstants';

const Footer = ({ children, narrow }) => (
  <FlexContainer
    nodeType="footer"
    addBoxStyle={css`
      display: block;
      text-align: center;
      height: 3rem;
      ${!narrow
        && css`
          padding-left: ${sideBar.widthDefault};
        `}
    `}
  >
    {children}
  </FlexContainer>
);

Footer.propTypes = {
  children: PropTypes.node,
  narrow: PropTypes.bool,
};

Footer.defaultProps = {
  children: null,
  narrow: false,
};

export default Footer;
