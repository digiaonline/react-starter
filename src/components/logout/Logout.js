/*eslint no-unused-vars: 0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../actions/auth';

export class Logout extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div className="logout">You have been logged out.</div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(logout());
      dispatch(push('/login'));
    }
  };
}

export const LogoutContainer = connect(null, mapDispatchToProps)(Logout);
