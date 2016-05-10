import React, { PropTypes } from 'react';

import PlanetsItem from './item';

export const PlanetsList = ({ isLoading, data }) => (
  <ul className="planets-list">
    {isLoading ? <div>Loading...</div> : data.map((planet, index) => (
      <li className="planets-list__item" key={index}>
        <PlanetsItem data={planet}/>
      </li>
    ))}
  </ul>
);

PlanetsList.propTypes = {
  data: PropTypes.array.isRequired
};

PlanetsList.defaultProps = {
  data: []
};

export default PlanetsList;
