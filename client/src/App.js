import React, { Component } from 'react';
// import logo from './logo.svg';
// import Loss from './components/Loss';
import axios from 'axios';
import Board from './components/Board';

class App extends Component {
  async componentDidMount() {
    const response = await axios.get('api/test');
    console.log('Response', response);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {/* <Loss /> */}
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
