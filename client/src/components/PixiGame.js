import * as PIXI from 'pixi.js'
import React, { Component } from 'react'
import PixiApp from '../utilities/GameLogic'
import { getMazeFromImage } from '../utilities/imageAnalysis'

class PixiGame extends Component {
	componentDidMount(){
		const image = this.refs.mazeImage
		var img = new Image 
		img.crossOrigin = "Anonymous"
		img.src = "https://capstone-1806.s3.amazonaws.com/bucketFolder/1534195654812-lg.jpg"
		
		img.onload = () => {
      		const mazeGrid = getMazeFromImage(this.refs.mazeImageCanvas, img)
      		console.log('mazeGrid', mazeGrid)
      		this.refs.board.appendChild(PixiApp(img.src, mazeGrid).view)
    	}
		
	}

	render(){
		return (
			<div>
			<div ref="board">
			</div>
			<img id="mazeImage" ref="mazeImage" src="https://capstone-1806.s3.amazonaws.com/bucketFolder/1534195654812-lg.jpg" alt="simpleMaze"/>
        	<canvas id="mazeImageCanvas" ref="mazeImageCanvas" width="500" height="500" style={{border:"1px solid #000000"}} ></canvas>
			</div>

		)
	}
}

export default PixiGame
