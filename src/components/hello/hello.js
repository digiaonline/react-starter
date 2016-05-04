import React from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'react-foundation';
import { Navbar } from '../navbar/navbar';

export const Hello = ({ isAuthenticated }) => (
  <div className="hello">
    <Navbar isAuthenticated={isAuthenticated}/>
    <Row>
      <Column>
        <p className="hello__text">Hello from React!</p>
      </Column>
    </Row>
  </div>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.get('isAuthenticated')
  };
}

export const HelloContainer = connect(mapStateToProps)(Hello);
