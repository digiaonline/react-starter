/*eslint no-unused-vars: 0*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../state/auth/actions';

export class Logout extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div className="logout">You have been logged out.</div>
    );
  }
}

Logout.propTypes = {
  onMount: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    onMount: () => {
      dispatch(logout());
      dispatch(push('/login'));
    }
  };
}

export const LogoutContainer = connect(null, mapDispatchToProps)(Logout);
