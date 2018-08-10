import React, { PureComponent } from 'react';
import { Surface } from 'react-art';
import displayHelper from '../utilities/displayHelper';
import _ from 'lodash';
import Events from 'events';
import Grid from './Grid';
import {scrapeImageData, getMazeFromImage} from '../utilities/imageAnalysis'
import { sketchMaze_10px } from '../mazeGrids/10px_tiles'

const event = new Events.EventEmitter();

class Board extends PureComponent {
  constructor() {
    super();
    this.state = {
      displayDimensions: displayHelper(_, event).getDimensions(),
      mazeData: sketchMaze_10px
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

    // testing image analysis
    const canvas = this.refs.mazeImageCanvas
    const image = this.refs.mazeImage
     image.onload = () => {
      this.setState({mazeData: getMazeFromImage(canvas, image)})
    }

  }

  componentWillUnmount() {
    displayHelper(_, event).unsubscribeResize(this.setDisplayDimensions);
  }

  render() {
    const width = 600,
    height = 600

    const style = {
      position: 'absolute',
      top: '30px',
      left: '30px',
      zIndex: '-1'
    }

    return (
      <div>
        <Surface width={width} height={height}>
          <Grid
            width={width}
            height={height}
            mazeData={this.state.mazeData}
          /> 
        </Surface>
        <img id="mazeImage" ref="mazeImage" src="shelbyHand.jpg" alt="simpleMaze" style={style}/>
        <canvas id="mazeImageCanvas" ref="mazeImageCanvas" width="500" height="500" style={{border:"1px solid #000000"}} ></canvas>


      </div>
    );
  }
}

export default Board;
