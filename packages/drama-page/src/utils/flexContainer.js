import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export default (nodeType = 'div', { addContainerStyle, addBoxStyle } = {}) => {
  const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    ${addContainerStyle}
  `;

  const FlexBox = styled(nodeType)`
    width: 960px;
    justify-content: center;
    display: flex;
    align-items: center;
    ${addBoxStyle}
  `;

  const FlexContainerComponent = ({ children }) => (
    <FlexContainer>
      <FlexBox>{children}</FlexBox>
    </FlexContainer>
  );

  FlexContainerComponent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  };

  FlexContainerComponent.defaultProps = {
    children: [],
  };

  return FlexContainerComponent;
};
