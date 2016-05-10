/*eslint no-unused-vars: 0*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { Row, Column } from 'react-foundation';

import { loadData, fetchData } from '../../state/modules/planets';

import PlanetsList from '../../components/planets/list';

export class Planets extends Component {
  static fetchData({ dispatch }) {
    return Promise.all([
      dispatch(loadData()),
      dispatch(fetchData())
    ]);
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
    data: state.planets.get('data').toJS(),
    isLoading: state.planets.get('loading')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ loadData }, dispatch)
  };
}

const PlanetsContainer = connect(mapStateToProps, mapDispatchToProps)(Planets);

export default PlanetsContainer;
