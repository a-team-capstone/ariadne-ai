import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import showFloodFill from '../utilities/FloodFillView'
import { getMazeFromImage } from '../utilities/imageAnalysis'
import floodFill from '../utilities/floodFill'

class FloodFill extends Component {
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
			console.log(
				'image in PixiGame, naturalHeight & naturalWidth',
				image.naturalHeight,
				image.naturalWidth
			)

			this.setState({
				imageHeight: image.naturalHeight,
				imageWidth: image.naturalWidth
			})

			const tileSize = Math.floor(image.naturalWidth / 25)
			const mazeGrid = getMazeFromImage(
				this.refs.mazeImageCanvas,
				image,
				tileSize
			)
			// row, col, array, numPixels, blockedVal
			const floodedMaze = floodFill(0, 0, mazeGrid, tileSize, 1)
			console.log('floodedMaze', floodedMaze)
			// console.log(
			// 	'mazeGrid dimensions (height, width)',
			// 	mazeGrid.length,
			// 	mazeGrid[0].length
			// )
			// console.log('mazeGrid:', mazeGrid)
			// console.log('Image.src', image.src)
			this.refs.board.appendChild(
				showFloodFill(image.src, floodedMaze, tileSize).view
			)
		}
	}
	render() {
		const { image } = this.props
		const invisibleImage = {}
		const invisibleCanvas = {}
		return (
			<div>
				<h3>Is it solvable?</h3>
				<div ref="board" />
				<img
					id="mazeImage"
					ref="mazeImage"
					src={image}
					alt="simpleMaze"
					style={invisibleImage}
				/>
				<canvas
					id="mazeImageCanvas"
					ref="mazeImageCanvas"
					style={invisibleCanvas}
					width={this.state.imageWidth} // "4032" //{imageWidth} //"4032" //"2500" //"4032" //"600" //update with image width
					height={this.state.imageHeight} // "3024" // {imageHeight} //"3024" //"1875" // "3024" //"800" //update with image height
					//style={{ border: '1px solid #000000' }}
				/>
				{/* If solvable show save button to save it to db  */}
				<Link to="/play">
					<button type="button" className="btn btn-primary">
						Save
					</button>
				</Link>
				{/* If not solvable show try again sends back to create maze */}
				<Link to="/create-maze">
					<button type="button" className="btn btn-danger">
						Try Again
					</button>
				</Link>
			</div>
		)
	}
}

const mapState = state => {
	return {
		image: state.image
	}
}

const mapDispatch = dispatch => {
	return {}
}

export default connect(
	mapState,
	mapDispatch
)(FloodFill)
