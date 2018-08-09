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
    const width = 600,
    height = 600

    const style = {
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '-1'
    }

    return (
      <div>
        <h3>Your Maze</h3>
        <Surface width={width} height={height}>
          <Grid
            width={width}
            height={height}
          />
        </Surface>
        <img src="oneLine.jpg" alt="one line" style={style}/>
      </div>
    );
  }
}

export default Board;
