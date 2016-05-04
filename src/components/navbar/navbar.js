import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {
  Row,
  Column,
  TopBar,
  TopBarTitle,
  TopBarRight,
  Menu,
  MenuItem
} from 'react-foundation';

export const Navbar = ({ isAuthenticated }) => (
  <TopBar className="navbar">
    <Row>
      <Column>
        <TopBarTitle className="navbar__title"><Link to="/">React starter</Link></TopBarTitle>
        <TopBarRight className="navbar__right">
          <Menu>
            <MenuItem>
              {!isAuthenticated ? <Link to="/login">Log in</Link> : <Link to="/logout">Log out</Link>}
            </MenuItem>
          </Menu>
        </TopBarRight>
      </Column>
    </Row>
  </TopBar>
);

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool
};
