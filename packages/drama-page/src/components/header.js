import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const HeaderSection = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const Header = ({ siteTitle }) => (
  <HeaderSection>
    <div
      css={css`
        margin: 0 auto;
        max-width: 960px;
        padding: 1.45rem 1.0875rem;
      `}
    >
      <h1 style={{ margin: 0 }}>
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
    </div>
  </HeaderSection>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
