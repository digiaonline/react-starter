import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../../state/auth/actions';
import { debug } from '../../helpers/log';
import { Colors, Button } from 'react-foundation';

export class Login extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.onSuccess();
    }

    if (nextProps.errorMessage) {
      this.props.onError(nextProps.errorMessage);
    }
  }

  render() {
    const handleSubmit = event => {
      event.preventDefault();

      this.props.onSubmit(this.refs.email.value, this.refs.password.value);
    };

    return (
      <div className="login">
        <h2 className="login__title">React starter</h2>
        <div className="login__box">
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input type="email" ref="email" placeholder="name@example.com" required/>
            </label>
            <label>
              Password
              <input type="password" ref="password" placeholder="******" required/>
            </label>
            <Button className="login__submit" type="submit" color={Colors.PRIMARY} isExpanded>Log in</Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.get('isAuthenticated'),
    errorMessage: state.auth.get('errorMessage'),
    isLoading: state.auth.getIn(['session', 'isLoading'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (username, password) => {
      dispatch(login(username, password));
    },
    onSuccess: () => {
      dispatch(push('/'));
    },
    onError: (message) => {
      debug(message);
    }
  };
}

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
