import * as PIXI from 'pixi.js'
import React, { Component } from 'react'
import PixiApp from '../utilities/GameLogic'
import { getMazeFromImage } from '../utilities/imageAnalysis'

class PixiGame extends Component {
	componentDidMount(){
		const image = this.refs.mazeImage
		image.onload = () => {
      		const mazeGrid = getMazeFromImage(this.refs.mazeImageCanvas, image)
      		this.refs.board.appendChild(PixiApp('danMaze.jpg', mazeGrid).view)
    	}
		
	}

	render(){
		return (
			<div>
			<div ref="board">
			</div>
			<img id="mazeImage" ref="mazeImage" src="danMaze.jpg" alt="simpleMaze"/>
        	<canvas id="mazeImageCanvas" ref="mazeImageCanvas" width="500" height="500" style={{border:"1px solid #000000"}} ></canvas>
			</div>

		)
	}
}

export default PixiGame
