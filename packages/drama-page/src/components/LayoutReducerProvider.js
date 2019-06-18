import React, { createContext, useReducer, useContext } from 'react';

export const ProvideLayoutState = createContext({ sideBarOpen: false, scrollY: null });
export const ProvideLayoutDispatch = createContext(() => null);

export const OPEN_SIDE_BAR = Symbol('@slideSideBar/OPEN_SIDE_BAR');
export const CLOSE_SIDE_BAR = Symbol('@slideSideBar/CLOSE_SIDE_BAR');

const LayoutReducer = (state, action) => {
  switch (action.type) {
    case OPEN_SIDE_BAR:
      return { ...state, sideBarOpen: true, scrollY: window.scrollY };

    case CLOSE_SIDE_BAR:
      return { ...state, sideBarOpen: false };

    default:
      return state;
  }
};

const LayoutReducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LayoutReducer, { sideBarOpen: false });

  return (
    <ProvideLayoutState.Provider value={state}>
      <ProvideLayoutDispatch.Provider value={dispatch}>{children}</ProvideLayoutDispatch.Provider>
    </ProvideLayoutState.Provider>
  );
};

export const useLayoutReducer = () => {
  const state = useContext(ProvideLayoutState);
  const dispatch = useContext(ProvideLayoutDispatch);
  return [state, dispatch];
};

export default LayoutReducerProvider;
