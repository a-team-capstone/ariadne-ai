import React, { PureComponent } from 'react';
import { Surface } from 'react-art';
import displayHelper from '../utilities/displayHelper';
import _ from 'lodash';
import Events from 'events';
import Grid from './Grid';

const event = new Events.EventEmitter();

class Board extends PureComponent {
  constructor() {
    super();
    this.state = {
      displayDimensions: displayHelper(_, event).getDimensions(),
    };
    this.setDisplayDimensions = this.setDisplayDimensions.bind(this);
  }

  setDisplayDimensions() {
    this.setState({
      displayDimensions: displayHelper(_, event).getDimensions(),
    });
  }

  componentDidMount() {
    displayHelper(_, event).subscribeResize(this.setDisplayDimensions);
  }

  componentWillUnmount() {
    displayHelper(_, event).unsubscribeResize(this.setDisplayDimensions);
  }

  render() {
    const width = this.state.displayDimensions.width;
    const height = this.state.displayDimensions.height;

    return (
      <div>
        <h1>Grid</h1>
        <Surface width={width} height={height}>
          <Grid
            width={width}
            height={height}
            hexCountHorizontal="25"
            hexCountVertical="13"
          />
        </Surface>
      </div>
    );
  }
}

export default Board;
