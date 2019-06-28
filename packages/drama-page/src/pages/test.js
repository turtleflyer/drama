import React, { useState } from 'react';
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
    width="85%"
  />
);

const SideBarIconBox = styled.div`
  width: ${sideBar.icon.size};
  height: ${sideBar.icon.size};
  padding: ${sideBar.icon.padding};
  background-color: ${global.headerColor};
  display: flex;
  flex-direction: column;
`;

const SideBarIconClosedState = () => (
  <SideBarIconBox
    css={css`
      justify-content: space-between;
    `}
  >
    <HorizontalWhiteLine />
    <HorizontalWhiteLine />
    <HorizontalWhiteLine />
  </SideBarIconBox>
);

const SideBarIconOpenState = () => (
  <SideBarIconBox
    css={css`
      justify-content: space-around;
    `}
  >
    <DiagonalWhiteLine diagonal={-1} />
    <DiagonalWhiteLine diagonal={1} />
  </SideBarIconBox>
);

const SideBarIcon = ({ open }) => (open ? <SideBarIconOpenState /> : <SideBarIconClosedState />);

export default SideBarIconOpenState;
