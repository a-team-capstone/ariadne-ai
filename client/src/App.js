import React, { Component } from 'react';
import logo from './logo.svg';
import Loss from './components/Loss'
import './App.css';
import axios from 'axios';

class App extends Component {
  async componentDidMount() {
    const response = await axios.get('/api/test');
    console.log('Response', response);
  }
  render() {
    return (
      <div className="App">
        <Loss />
      </div>
    );
  }
}

export default App;
