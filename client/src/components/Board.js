import React, { PureComponent } from 'react';
import { Surface } from 'react-art';
import displayHelper from '../utilities/displayHelper';
import _ from 'lodash';
import Events from 'events';
import Grid from './Grid';
import {scrapeImageData} from '../utilities/imageAnalysis'

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

    // testing image analysis
    const canvas = this.refs.mazeImageCanvas
    const image = this.refs.mazeImage
    console.log('type of image', typeof image)
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0)

    const scrapedImage = scrapeImageData(canvas, image)
    console.log(scrapedImage.data)

  }

  componentWillUnmount() {
    displayHelper(_, event).unsubscribeResize(this.setDisplayDimensions);
  }

  render() {
    const width = 600,
    height = 600

    const style = {
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: '-1'
    }

    return (
      <div>
        <Surface width={width} height={height}>
          <Grid
            width={width}
            height={height}
          />
        </Surface>
        <img id="mazeImage" ref="mazeImage" src="doodleMazeUnsolveable.png" alt="simpleMaze" style={style}/>
        <canvas id="mazeImageCanvas" ref="mazeImageCanvas" width="500" height="500" style={{border:"1px solid #000000"}} ></canvas>

        <h1>{this.refs.mazeImageCanvas}</h1>



      </div>
    );
  }
}

export default Board;
