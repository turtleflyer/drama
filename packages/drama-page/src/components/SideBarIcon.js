import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { global, sideBar } from '../utils/uiEnvironmentConstants';

const WhiteLine = styled.div`
  border: 1px solid white;
  border-radius: 1px;
  background-color: white;
  height: 0;
  width: ${({ width }) => width};
`;

const HorizontalWhiteLine = () => <WhiteLine width="100%" />;

const DiagonalWhiteLine = ({ diagonal }) => (
  <WhiteLine
    css={css`
      transform: rotate(${diagonal * 45}deg);
    `}
    width={`calc(0.7 * (${sideBar.icon.size} - 2 * ${sideBar.icon.padding}) + 2px)`}
  />
);

const SideBarIconBox = styled.div`
  width: ${sideBar.icon.size};
  height: ${sideBar.icon.size};
  padding: ${sideBar.icon.padding};
  background-color: ${global.headerColor};
  display: flex;
  flex-direction: column;
  ${({ open }) => (open
    ? css`
          justify-content: space-around;
        `
    : css`
          justify-content: space-between;
        `)}
`;

const SideBarIcon = ({ open }) => (
  <SideBarIconBox {...{ open }}>
    {open
      ? [<DiagonalWhiteLine key="1" diagonal={-1} />, <DiagonalWhiteLine key="2" diagonal={1} />]
      : [
        <HorizontalWhiteLine key="1" />,
        <HorizontalWhiteLine key="2" />,
        <HorizontalWhiteLine key="3" />,
      ]}
  </SideBarIconBox>
);

export default SideBarIcon;
