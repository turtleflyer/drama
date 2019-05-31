import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import flexContainer from '../utils/flexContainer';

const HeaderContainer = flexContainer('header', {
  addContainerStyle: css`
    background: rebeccapurple;
    margin-bottom: 1.45rem;
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
