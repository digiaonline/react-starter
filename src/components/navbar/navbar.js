import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="navbar">
        <div className="navbar__inner">
          <div className="navbar__content">
            <div className="navbar__left">
              <ul className="menu">
                <li className="navbar__title">
                  <Link className="navbar__title-link" to="/">React starter</Link>
                </li>
              </ul>
            </div>
            <div className="navbar__right">
              <ul className="menu">
                {isAuthenticated ? <li><Link to="logout">Log out</Link></li> : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.get('isAuthenticated')
  };
}

export const NavbarContainer = connect(mapStateToProps)(Navbar);
