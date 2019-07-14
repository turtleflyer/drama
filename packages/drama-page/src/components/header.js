import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import { global } from '../utils/uiEnvironmentConstants';
import AddNarrow from './AddNarrow';

const Header = ({ siteTitle, narrow }) => (
  <AddNarrow
    nodeType="header"
    addContainerStyle={css`
      background: ${global.headerColor};
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 17;
    `}
    addBoxStyle={css`
      height: ${global.headHeight};
    `}
    {...{ narrow }}
  >
    <h1
      css={css`
        display: block;
        margin: 0;
      `}
    >
      <Link
        to="/"
        css={css`
          color: white;
          text-decoration: none;
        `}
      >
        {siteTitle}
      </Link>
    </h1>
  </AddNarrow>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  narrow: PropTypes.bool,
};

Header.defaultProps = {
  siteTitle: '',
  narrow: false,
};

export default Header;
