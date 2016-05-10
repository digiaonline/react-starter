import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouterContext } from 'react-router';
import { handleActions, createAction } from 'redux-actions';

// utils

function grabPromises(components, params, store) {
  return components
    .filter(component => component.fetchData instanceof Function)
    .map(component => component.fetchData(store, params));
}

export function fetchDataOnServer({ components, params }, store) {
  return Promise.all(grabPromises(components, params, store))
    .then(() => {
      store.dispatch(doneFetching());
    });
}

// component

class _FetchData extends Component {
  constructor(props) {
    super(props);

    this.state = { fetchedProps: props.isFetched ? props : null };
  }

  componentDidMount() {
    if (!this.props.isFetched) {
      this.loadData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.fetchedProps !== nextState.fetchedProps;
  }

  loadData(props) {
    const promises = grabPromises(
      props.components,
      props.params,
      this.context.store
    );

    Promise.all(promises).then(() => {
      this.props.actions.doneFetching();
      this.setState({ fetchedProps: props });
    });
  }

  render() {
    const { fetchedProps } = this.state;
    const { render } = this.props;
    return fetchedProps && render(fetchedProps);
  }
}

_FetchData.propTypes = {
  components: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

_FetchData.defaultProps = {
  render: props => <RouterContext {...props} />,
  isFetched: false
};

_FetchData.contextTypes = {
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

export const FetchData = connect(mapStateToProps, mapDispatchToProps)(_FetchData);

// reducer

const DONE_FETCHING = 'fetch-data/DONE_FETCHING';

const reducer = handleActions({
  [DONE_FETCHING]: state => {
    return { ...state, fetched: true };
  }
}, { fetched: false });

export const doneFetching = createAction(DONE_FETCHING);

export default reducer;
