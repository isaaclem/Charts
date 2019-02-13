import React from 'react';
import PropTypes from 'prop-types';
import { G, Line } from 'react-native-svg';

const Grid = ({ ticks = [], y, svg }) => {
  return (
    <G>
      {ticks.map(tick => (
        <Line
          key={tick}
          x1={'0%'}
          x2={'100%'}
          y1={y(tick)}
          y2={y(tick)}
          strokeWidth={1}
          stroke={'rgba(0,0,0,0.2)'}
          {...svg}
        />
      ))}
    </G>
  );
};

Grid.propTypes = {
  belowChart: PropTypes.bool,
  svg: PropTypes.object
};

Grid.defaultProps = { belowChart: true };

export default Grid;
