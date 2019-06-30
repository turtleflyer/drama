/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const FlexBox = styled.div`
  width: 960px;
  justify-content: center;
  display: flex;
  align-items: center;
  ${({ add }) => add}
`;

const FlexContainer = ({
  nodeType, addContainerStyle, addBoxStyle, children,
}) => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      ${addContainerStyle}
    `}
  >
    <FlexBox as={nodeType} add={addBoxStyle}>
      {children}
    </FlexBox>
  </div>
);

FlexContainer.propTypes = {
  nodeType: PropTypes.string,
  addContainerStyle: PropTypes.object,
  addBoxStyle: PropTypes.object,
  children: PropTypes.node,
};

FlexContainer.defaultProps = {
  nodeType: 'div',
  addContainerStyle: {},
  addBoxStyle: {},
  children: null,
};

export default FlexContainer;
