import { useMemo } from 'react';

// prettier-ignore
const useRem = () => useMemo(
  () => parseInt(getComputedStyle(document.documentElement).fontSize, 10), [],
);

export default useRem;
