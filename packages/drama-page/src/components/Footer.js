import React from 'react';
import { PropTypes } from 'prop-types';
import { css } from '@emotion/core';
import flexContainer from '../utils/flexContainer';

const FooterContainer = flexContainer('footer', {
  addBoxStyle: css`
    display: block;
    text-align: center;
    padding-left: 180px;
  `,
});

export default function Footer({ children }) {
  return <FooterContainer>{children}</FooterContainer>;
}

Footer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Footer.defaultProps = {
  children: [],
};
