import React from 'react';
import { PropTypes } from 'prop-types';
import { css } from '@emotion/core';
import FlexContainer from './FlexContainer';

const Footer = ({ children }) => (
  <FlexContainer
    nodeType="footer"
    addBoxStyle={css`
      display: block;
      text-align: center;
      height: 3rem;
    `}
  >
    {children}
  </FlexContainer>
);

Footer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Footer.defaultProps = {
  children: [],
};

export default Footer;
