/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

const useScroll = (handler, deps = []) => {
  useEffect(() => {
    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [handler, ...deps]);
};

export default useScroll;
