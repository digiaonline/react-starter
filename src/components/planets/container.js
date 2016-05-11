/*eslint no-unused-vars: 0*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { Row, Column } from 'react-foundation';

import { loadData, fetchData } from '../../state/modules/planets';

import PlanetsList from '../../components/planets/list';

export class Planets extends Component {
  static fetchData({ dispatch, getState }) {
    const promises = [];

    console.log('check if need fetch planets');

    if (!getState().planets.get('data').size) {
      console.log('fetching planets');

      promises.push(dispatch(loadData()));
      promises.push(dispatch(fetchData()));
    }

    return Promise.all(promises);
  }

  render() {
    const { isLoading, data } = this.props;

    return (
      <div className="planets">
        <Row>
          <Column>
            <h1 className="planets__title">Planets</h1>
            <PlanetsList isLoading={isLoading} data={data}/>
          </Column>
        </Row>
      </div>
    );
  }
}

Planets.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

Planets.defaultProps = {
  isLoading: false,
  data: []
};

function mapStateToProps(state) {
  return {
    isLoading: state.planets.get('loading'),
    data: state.planets.get('data').toJS()
  };
}

const PlanetsContainer = connect(mapStateToProps)(Planets);

export default PlanetsContainer;
