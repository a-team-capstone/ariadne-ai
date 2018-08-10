import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


class Routes extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route path="/sign-up" component={}/>
          <Route path="/main-view" component={} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
