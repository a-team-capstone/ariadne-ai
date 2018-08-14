import * as PIXI from 'pixi.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PixiApp from '../utilities/GameLogic'
import { getMazeFromImage } from '../utilities/imageAnalysis'

class PixiGame extends Component {
	componentDidMount() {
		const tileSize = 100
		const image = this.refs.mazeImage

		image.crossOrigin = 'Anonymous'
		image.onload = () => {
			console.log('image in PixiGame, naturalHeight & naturalWidth', image.naturalHeight, image.naturalWidth)
			const mazeGrid = getMazeFromImage(this.refs.mazeImageCanvas, image, tileSize)
			console.log('mazeGrid dimensions (height, width)', mazeGrid.length, mazeGrid[0].length)
			console.log('mazeGrid:', mazeGrid)
			this.refs.board.appendChild(PixiApp(image.src, mazeGrid, tileSize).view)
		}
	}

	render() {
		const { image } = this.props
		return (
			<div>
				<div ref="board" />
				<img id="mazeImage" ref="mazeImage" src={image} alt="simpleMaze" />
				<canvas
					id="mazeImageCanvas"
					ref="mazeImageCanvas"
					width= "4032" //"2500" //"4032" //"600" //update with image width
					height= "3024" //"1875" // "3024" //"800" //update with image height
					style={{ border: '1px solid #000000' }}
				/>
			</div>
		)
	}
}

const mapState = state => {
	return {
		image: state.image
	}
}

export default connect(
	mapState,
	null
)(PixiGame)
