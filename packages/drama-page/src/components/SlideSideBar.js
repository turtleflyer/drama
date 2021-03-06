/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import SectionsSideBar from './SectionsSideBar';
import { useLayoutReducer, CLOSE_SIDE_BAR, OPEN_SIDE_BAR } from './LayoutReducerProvider';
import SideBarIcon from './SideBarIcon';
import { global, sideBar } from '../utils/uiEnvironmentConstants';

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
      <div
        css={css`
          position: fixed;
          z-index: 20;
          top: calc(${global.headHeight} - ${sideBar.icon.size} - ${sideBar.icon.verticalPosition});
          left: ${sideBar.icon.horizontalPosition};
        `}
        onClick={callback(sideBarOpen ? CLOSE_SIDE_BAR : OPEN_SIDE_BAR)}
      >
        <SideBarIcon open={sideBarOpen} />
      </div>
      {sideBarOpen ? <SectionsSideBar {...{ active }} fixed /> : null}
    </>
  );
};

SlideSideBar.propTypes = {
  active: PropTypes.string.isRequired,
};

export default SlideSideBar;
