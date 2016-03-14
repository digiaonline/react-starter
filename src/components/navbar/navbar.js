import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  Row,
  Column,
  ResponsiveNavigation,
  TopBarTitle,
  TopBarLeft,
  TopBarRight,
  Menu,
  MenuItem
} from 'react-foundation';

export class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <ResponsiveNavigation className="navbar">
        <Row>
          <Column large={12}>
          <TopBarTitle>React starter</TopBarTitle>
          <TopBarLeft>
            <Menu>
              <MenuItem><Link to="/">Home</Link></MenuItem>
            </Menu>
          </TopBarLeft>
          <TopBarRight>
            <Menu>
              <MenuItem>
                {!isAuthenticated ? <Link to="/login">Log in</Link> : <Link to="/logout">Log out</Link>}
              </MenuItem>
            </Menu>
          </TopBarRight>
          </Column>
        </Row>
      </ResponsiveNavigation>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.get('isAuthenticated')
  };
}

export const NavbarContainer = connect(mapStateToProps)(Navbar);
