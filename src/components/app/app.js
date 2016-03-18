/*eslint no-unused-vars: 0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavbarContainer } from '../navbar/navbar';

export const App = (props) => {
  return (
    <div className="app">
      <NavbarContainer/>
      {props.children}
    </div>
  );
};
