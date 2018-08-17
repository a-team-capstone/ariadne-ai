import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import showFloodFill from '../utilities/FloodFillView'
import { getMazeFromImage } from '../utilities/imageAnalysis'
import floodFill from '../utilities/floodFill'
import { uploadMaze } from '../store/maze'

class FloodFill extends Component {
	constructor() {
		super()
		this.state = {
			imageHeight: 0,
			imageWidth: 0,
			desiredWidth: 600,
			desiredHeight: 800,
			solvable: '...analyzing...',
			explainerText: 'Detecting accessible maze regions using flood fill algorithm',
			maze: [],
			obstacles: {}
		}
	}

	componentDidMount() {
		const image = this.refs.mazeImage
		image.crossOrigin = '*'

		const tileSize = Math.floor(this.state.desiredWidth / 25)

		image.onload = async() => {
			this.setState({
				imageHeight: image.naturalHeight,
				imageWidth: image.naturalWidth
			})
				const { mazeGrid, obstacleAvgs } = await getMazeFromImage(
					this.refs.mazeImageCanvas,
					image,
					tileSize
				)
				const mazeGoal = {row: mazeGrid.length-1, col: mazeGrid[0].length-1}
				const maze = mazeGrid.map(row => row.slice())
				this.setState({ maze: maze, obstacles: obstacleAvgs })

				const startPoint = [25, 100]
				const endPoint = [25, 500]

				var startCol = Math.round(startPoint[0]/tileSize)
				var startRow = Math.round(startPoint[1]/tileSize)
				var endCol = Math.round(endPoint[0]/tileSize)
				var endRow = Math.round(endPoint[1]/tileSize)

				console.log('calling floodFill, starting at (row, col)', startRow, startCol)
				const floodedMaze = floodFill(startRow, startCol, mazeGrid, tileSize, 1)
				const solvable = (floodedMaze[endRow][endCol] === -1) ? 'YES' : 'NO'
				const explainerText = 'Blue dots = accessible from starting point.'
				this.setState({solvable, explainerText})

				console.log('this.refs.board', this.refs.board)
				this.refs.board.appendChild(
					showFloodFill(image.src, floodedMaze, tileSize, startPoint, endPoint).view)
			}
		}

	render() {
		const invisibleImage = {display: "none"}
		const invisibleCanvas = {opacity: 0}
		const { image, handleClick, user } = this.props
		const solveable = this.state.solvable

		return (
			<div id="floodFillView" className="floodFill">
				<h3>Is it solvable? </h3>
				<h2>{this.state.solvable}</h2>
				<h5>{this.state.explainerText}</h5>
				<div ref="board" id="floodFillCanvas"/>
				<img
					id="mazeImage"
					ref="mazeImage"
					src={image}
					alt="simpleMaze"
					style={invisibleImage}
					width={this.state.desiredWidth}
					height={this.state.desiredHeight}
				/>
				<div
					id="floodFillCanvasAndButtons"
					// style = {canvasStyle}
				>
					<canvas
						id="mazeImageCanvas"
						ref="mazeImageCanvas"
						style={invisibleCanvas}
						// width={this.state.imageWidth} // "4032" //{imageWidth} //"4032" //"2500" //"4032" //"600" //update with image width
						width={this.state.desiredWidth}
						height={this.state.desiredHeight}
						// height={this.state.imageHeight} // "3024" // {imageHeight} //"3024" //"1875" // "3024" //"800" //update with image height
						//style={{ border: '1px solid #000000' }}
					/>
				<div className="row" id="floodFillButtons">
					{/* </Link> */}
					{/* If not solvable show try again sends back to create maze */}
					<Link to="/create-maze">
						<button type="button" className="btn btn-primary">
							Send to a friend
						</button>
					{/* <Link to="/pixi"> */}
					<button
						type="button"
						id="playButton"
						className="btn btn-primary"
						onClick={() => handleClick(this.state.maze, image, user.id, solveable)}
					>
						Play
					</button>
					</Link>
					<Link to="/create-maze">
						<button type="button" className="btn btn-primary">
							Create new maze
						</button>
					</Link>
				</div>
				</div>
			</div>
		)
	}
}

const mapState = state => {
	return {
		user: state.user,
		image: state.image
	}
}

const mapDispatch = dispatch => {
	return {
		handleClick(maze, image, userId, solveable) {
			dispatch(
				uploadMaze({ image: image, solveable: solveable, data: maze, userId })
			)
		}
	}
}

export default connect(
	mapState,
	mapDispatch
)(FloodFill)
