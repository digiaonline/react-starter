import React, { PropTypes } from 'react';

export const PlanetsItem = ({ data }) => (
  <div className="planets-item">
    <h3 className="planets-item__title">{data.name}</h3>
  </div>
);

PlanetsItem.propTypes = {
  data: PropTypes.object.isRequired
};

PlanetsItem.defaultProps = {
  data: {}
};

export default PlanetsItem;
