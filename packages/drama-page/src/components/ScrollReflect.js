import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ParamReflect from './ParamReflect';
import useScroll from '../utils/useScroll';

const ScrollReflect = ({ scrollRange, mappedProps, children }) => {
  const [point, setPoint] = useState(0);

  useScroll(() => {
    const calculatePoint = (window.scrollY - scrollRange[0]) / (scrollRange[1] - scrollRange[0]);
    if (calculatePoint < 0) {
      setPoint(0);
    } else if (calculatePoint > 1) {
      setPoint(1);
    } else {
      setPoint(calculatePoint);
    }
  });

  return <ParamReflect {...{ mappedProps, point }}>{children}</ParamReflect>;
};

ScrollReflect.propTypes = {
  scrollRange: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  mappedProps: PropTypes.objectOf(PropTypes.array.isRequired).isRequired,
  children: PropTypes.node.isRequired,
};

export default ScrollReflect;
