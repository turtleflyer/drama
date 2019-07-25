/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from 'react';

const useScroll = (handler, deps) => {
  const callback = useCallback(handler, deps);

  useEffect(() => {
    window.addEventListener('scroll', callback);

    return () => {
      window.removeEventListener('scroll', callback);
    };
  }, deps);
};

export default useScroll;
