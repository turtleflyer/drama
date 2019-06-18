import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import SectionsSideBar from './SectionsSideBar';
import { useLayoutReducer, OPEN_SIDE_BAR, CLOSE_SIDE_BAR } from './LayoutReducerProvider';

const IconContainer = styled.div`
  z-index: 20;
  position: fixed;
  left: 0;
`;

const SideBarIcon = ({ sideBarOpen, openSideBarCallback, closeSideBarCallback }) => (sideBarOpen ? (
  <IconContainer onClick={closeSideBarCallback}>O</IconContainer>
) : (
  <IconContainer onClick={openSideBarCallback}>C</IconContainer>
));

const SlideSideBar = ({ active }) => {
  const [state, dispatch] = useLayoutReducer();
  const { sideBarOpen } = state;

  const callback = useCallback(
    type => () => {
      dispatch({ type });
    },
    [dispatch],
  );

  return (
    <>
      {sideBarOpen ? <SectionsSideBar {...{ active }} fixed /> : null}
      <SideBarIcon
        {...{
          sideBarOpen,
          openSideBarCallback: callback(OPEN_SIDE_BAR),
          closeSideBarCallback: callback(CLOSE_SIDE_BAR),
        }}
      />
    </>
  );
};

export default SlideSideBar;
