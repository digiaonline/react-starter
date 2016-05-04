/*eslint no-unused-vars: 0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavbarContainer } from '../navbar/navbar';

export const App = ({ children }) => {
  return (
    <div className="app">
      <NavbarContainer/>
      {children}
    </div>
  );
};
