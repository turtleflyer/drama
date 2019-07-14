import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import AddNarrow from './AddNarrow';
import { siblingSections } from '../utils/sectionsStructure';
import { sideBar } from '../utils/uiEnvironmentConstants';

// eslint-disable-next-line no-unused-vars
const Triangle = ({ left, right }) => (
  <div
    css={css`
      width: 0;
      height: 0;
      border: 0.3rem solid transparent;
      display: inline-block;
      margin: auto 0.3rem;
      ${left
      ? css`
            border-right: 0.5rem solid ${sideBar.entryColor};
            border-left-width: 0;
          `
      : css`
            border-left: 0.5rem solid ${sideBar.entryColor};
            border-right-width: 0;
          `};
    `}
  />
);

Triangle.propTypes = {
  left: PropTypes.bool,
  right: PropTypes.bool,
};

Triangle.defaultProps = {
  left: false,
  right: true,
};

const BlankSpace = styled.div`
  width: 50%;
  flex-grow: 1;
`;

const PrevNextNavigation = ({ narrow, active }) => {
  const [siblings, setSiblings] = useState(null);
  useEffect(() => {
    siblingSections(active).then((sib) => {
      setSiblings(sib);
    });
  }, [active, setSiblings]);
  return (
    <AddNarrow
      {...{ narrow }}
      addContainerStyle={css`
        height: 5rem;
      `}
    >
      {siblings && (
        <div
          css={css`
            padding: 0 3rem;
            display: flex;
            width: 100%;
            & a {
              width: 50%;
              text-decoration: none;
              color: ${sideBar.entryColor};
              display: flex;
              line-height: 95%;
              align-items: center;
          `}
        >
          {siblings.prev ? (
            <Link
              to={siblings.prev.path}
              css={css`
                text-align: right;
                justify-content: flex-end;
              `}
            >
              {siblings.prev.title}
              <Triangle left />
            </Link>
          ) : (
            <BlankSpace />
          )}
          {siblings.next ? (
            siblings.next && (
              <Link to={siblings.next.path}>
                <Triangle right />
                {siblings.next.title}
              </Link>
            )
          ) : (
            <BlankSpace />
          )}
        </div>
      )}
    </AddNarrow>
  );
};

PrevNextNavigation.propTypes = {
  narrow: PropTypes.bool,
  active: PropTypes.string.isRequired,
};

PrevNextNavigation.defaultProps = {
  narrow: false,
};

export default PrevNextNavigation;
