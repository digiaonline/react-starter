import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouterContext } from 'react-router';
import { doneFetching } from './module';
import { grabPromises } from './utils';

class FetchData extends Component {
  componentWillMount() {
    if (!this.props.isFetched) {
      this.fetchData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }

  fetchData(props) {
    const promises = grabPromises(
      props.components,
      props.params,
      this.context.store
    );

    Promise.all(promises).then(() => {
      this.props.actions.doneFetching();
    });
  }

  render() {
    return <RouterContext {...this.props}/>;
  }
}

FetchData.propTypes = {
  isFetched: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

FetchData.defaultProps = {
  isFetched: false
};

FetchData.contextTypes = {
  store: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isFetched: state.fetching.fetched
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ doneFetching }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchData);
