import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
        <p className="App-intro">
          Hello from React!
        </p>
          <Footer/>
      </div>
    );
  }
}

export default App;
