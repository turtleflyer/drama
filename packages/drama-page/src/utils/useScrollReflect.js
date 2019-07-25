import useParamReflect from './useParamReflect';
import useScroll from './useScroll';

const useScrollReflect = (scrollRange, valueRange, continuousRange = false) => {
  const [value, setPoint] = useParamReflect(valueRange, continuousRange);

  useScroll(() => {
    const calculatePoint = (window.scrollY - scrollRange[0]) / (scrollRange[1] - scrollRange[0]);
    if (calculatePoint < 0) {
      setPoint(0);
    } else if (calculatePoint > 1) {
      setPoint(1);
    } else {
      setPoint(calculatePoint);
    }
  }, []);

  return value;
};

export default useScrollReflect;
