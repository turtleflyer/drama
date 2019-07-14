import React from 'react';
import { PropTypes } from 'prop-types';
import { css } from '@emotion/core';
import AddNarrow from './AddNarrow';

const Footer = ({ children, narrow }) => (
  <AddNarrow
    nodeType="footer"
    addBoxStyle={css`
      display: block;
      text-align: center;
      height: 3rem;
    `}
    {...{ narrow }}
  >
    {children}
  </AddNarrow>
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
