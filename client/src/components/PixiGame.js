import * as PIXI from 'pixi.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PixiApp from '../utilities/GameLogic'
import { getMazeFromImage } from '../utilities/imageAnalysis'

class PixiGame extends Component {
	componentDidMount() {
		const image = this.refs.mazeImage
		image.crossOrigin = 'Anonymous'
		image.onload = () => {
			const mazeGrid = getMazeFromImage(this.refs.mazeImageCanvas, image)
			console.log('mazeGrid:', mazeGrid)
			this.refs.board.appendChild(PixiApp(image.src, mazeGrid).view)
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
					width="600"
					height="800"
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
