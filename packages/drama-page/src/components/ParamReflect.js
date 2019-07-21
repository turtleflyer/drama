import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

const continuosRange = Symbol('continuous range');

const pickInRange = (range, point) => {
  const { length } = range;
  if (length === 3 && range[1] === continuosRange) {
    return range[0] + (range[2] - range[0]) * point;
  }

  return range[Math.round((length - 1) * point)];
};

const ParamReflect = ({ mappedProps, point, children }) => {
  const actualProps = Object.keys(mappedProps).reduce(
    (props, key) => ({ ...props, [key]: pickInRange(mappedProps[key], point) }),
    {},
  );

  return (
    <>
      {typeof children === 'function'
        ? children({ ...actualProps })
        : Children.map(
          children,
          // eslint-disable-next-line consistent-return
          (el) => {
            if (el) {
              return cloneElement(el, { ...actualProps });
            }
          },
        )}
    </>
  );
};

ParamReflect.propTypes = {
  mappedProps: PropTypes.objectOf(PropTypes.array.isRequired).isRequired,
  point: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default ParamReflect;
export { continuosRange };
