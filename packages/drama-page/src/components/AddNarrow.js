/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import FlexContainer from './FlexContainer';
import { sideBar } from '../utils/uiEnvironmentConstants';

const AddNarrow = ({
  children, narrow, nodeType, addContainerStyle, addBoxStyle,
}) => (
  <FlexContainer
    {...{ nodeType, addContainerStyle }}
    addBoxStyle={css`
      ${addBoxStyle}
      ${!narrow
        && css`
          padding-left: ${sideBar.widthDefault};
        `}
    `}
  >
    {children}
  </FlexContainer>
);

AddNarrow.propTypes = {
  children: PropTypes.node,
  narrow: PropTypes.bool,
  nodeType: PropTypes.string,
  addContainerStyle: PropTypes.object,
  addBoxStyle: PropTypes.object,
};

AddNarrow.defaultProps = {
  children: null,
  narrow: false,
  nodeType: 'div',
  addContainerStyle: {},
  addBoxStyle: {},
};

export default AddNarrow;
