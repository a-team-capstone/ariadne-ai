import * as PIXI from 'pixi.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PixiApp from '../utilities/GameLogic'
import { getMazeFromImage } from '../utilities/imageAnalysis'

class PixiGame extends Component {
	constructor() {
		super()
		this.state = {
			imageHeight: 0,
			imageWidth: 0
		}
	}

	componentDidMount() {
		const image = this.refs.mazeImage

		image.crossOrigin = 'Anonymous'
		image.onload = () => {
			console.log('image in PixiGame, naturalHeight & naturalWidth', image.naturalHeight, image.naturalWidth)

			this.setState({
				imageHeight: image.naturalHeight,
				imageWidth: image.naturalWidth
			})

			const tileSize = Math.floor(image.naturalWidth/100)
			const mazeGrid = getMazeFromImage(this.refs.mazeImageCanvas, image, tileSize)
			console.log('mazeGrid dimensions (height, width)', mazeGrid.length, mazeGrid[0].length)
			console.log('mazeGrid:', mazeGrid)
			this.refs.board.appendChild(PixiApp(image.src, mazeGrid, tileSize).view)
		}
	}

	render() {
		const {image} = this.props
		const invisibleImage = {display: "none"}
		const invisibleCanvas = {opacity: 0}
		console.log('imageHeight, imageWidth', this.state.imageHeight, this.state.imageWidth)
		return (
			<div>
				<div ref="board" />
				<img id="mazeImage" ref="mazeImage" src={image} alt="simpleMaze" style={invisibleImage}/>
				<canvas
					id="mazeImageCanvas"
					ref="mazeImageCanvas"
					style={invisibleCanvas}
					width= {this.state.imageWidth} // "4032" //{imageWidth} //"4032" //"2500" //"4032" //"600" //update with image width
					height= {this.state.imageHeight} // "3024" // {imageHeight} //"3024" //"1875" // "3024" //"800" //update with image height
					//style={{ border: '1px solid #000000' }}
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
