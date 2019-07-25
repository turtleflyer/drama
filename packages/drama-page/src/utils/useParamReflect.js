import { useState, useEffect } from 'react';

const useParamReflect = (valueRange, continuousRange = false) => {
  const [value, setValue] = useState(valueRange[0]);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const { length } = valueRange;
    if (continuousRange) {
      setValue(valueRange[0] + (valueRange[1] - valueRange[0]) * point);
    } else {
      setValue(valueRange[Math.round((length - 1) * point)]);
    }
  }, [continuousRange, point, valueRange]);

  return [value, setPoint];
};

export default useParamReflect;
