import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import flexContainer from '../utils/flexContainer';
import { global } from '../utils/uiEnvironmentConstants';

const HeaderContainer = flexContainer('header', {
  addContainerStyle: css`
    background: ${global.headerColor};
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 17;
  `,
  addBoxStyle: css`
    height: 5rem;
  `,
});

export default function Header({ siteTitle }) {
  return (
    <HeaderContainer>
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
    </HeaderContainer>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};
