import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const HeaderContainer = styled.div`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
  display: flex;
  justify-content: center;
`;

const HeaderBox = styled.header`
  width: 960px;
  height: 5rem;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <HeaderBox>
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
    </HeaderBox>
  </HeaderContainer>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
