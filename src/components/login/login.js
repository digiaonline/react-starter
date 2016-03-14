import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../../actions/auth';
import { debug } from '../../helpers/log';
import { Button, ButtonColors } from 'react-foundation';

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
    const { onSubmit } = this.props;

    const handleSubmit = event => {
      event.preventDefault();

      onSubmit(this.refs.email.value, this.refs.password.value);
    };

    return (
      <div className="login">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input type="email" ref="email" placeholder="name@example.com" required/>
            </label>
            <label>
              Password
              <input type="password" ref="password" placeholder="******" required/>
            </label>
            <Button type="submit" color={ButtonColors.PRIMARY} isExpanded>Log in</Button>
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
    isLoading: state.auth.get('isLoading')
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
