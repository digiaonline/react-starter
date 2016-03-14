/*eslint no-unused-vars: 0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavbarContainer } from '../navbar/navbar';

export class App extends Component {
  render() {
    return (
      <div className="app">
        <NavbarContainer/>
        {this.props.children}
      </div>
    );
  }
}
