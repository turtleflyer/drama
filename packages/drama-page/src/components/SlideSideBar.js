import React, { useReducer, useCallback } from 'react';
import styled from '@emotion/styled';
import SectionsSideBar from './SectionsSideBar';

const OPEN_SIDE_BAR = Symbol('@slideSideBar/OPEN_SIDE_BAR');
const CLOSE_SIDE_BAR = Symbol('@slideSideBar/CLOSE_SIDE_BAR');

const slideSideBarReducer = (state, action) => {
  switch (action.type) {
    case OPEN_SIDE_BAR:
      return { ...state, sideBarOpen: true };

    case CLOSE_SIDE_BAR:
      return { ...state, sideBarOpen: false };

    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(slideSideBarReducer, { sideBarOpen: false });
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
