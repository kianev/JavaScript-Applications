import React, { Component } from 'react';
import Header from './components/common/Header';

import { Link } from 'react-router';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Header>
            <Link to="/" className="btn btn-default">Home</Link>
            <Link to="/catalog" className="btn btn-default">Catalog</Link>
            <Link to="/about" className="btn btn-default">About</Link>
            <Link to="/register" className="btn btn-default">Register</Link>
        </Header>
          {this.props.children}
      </div>
    );
  }
}

export default App;
