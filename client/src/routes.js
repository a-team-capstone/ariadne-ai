import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PixiGame from './components/PixiGame'


class Routes extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route path="/sign-up" />
          <Route path="/main-view"  />
          <Route exact path="/pixi" component={PixiGame} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
