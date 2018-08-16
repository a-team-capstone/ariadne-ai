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
			solvable: 'loading',
			maze: [],
			obstacles: {}
		}
	}

	componentDidMount() {
		const image = this.refs.mazeImage

		image.crossOrigin = 'Anonymous'
		image.onload = async() => {
			// console.log(
			// 	'image in PixiGame, naturalHeight & naturalWidth',
			// 	image.naturalHeight,
			// 	image.naturalWidth
			// )

			this.setState({
				imageHeight: image.naturalHeight,
				imageWidth: image.naturalWidth
			})
			const tileSize = Math.floor(this.state.desiredWidth / 25)
			const { mazeGrid, obstacleAvgs } = await getMazeFromImage(
				this.refs.mazeImageCanvas,
				image,
				tileSize
			)
			const mazeGoal = {row: mazeGrid.length-1, col: mazeGrid[0].length-1}
			const maze = mazeGrid.map(row => row.slice())
			this.setState({ maze: maze, obstacles: obstacleAvgs })

			const floodedMaze = floodFill(0, 0, mazeGrid, tileSize, 1)
			const solvable = (floodedMaze[mazeGoal.row][mazeGoal.col] === -1)
			this.setState({solvable})

			this.refs.board.appendChild(
				showFloodFill(image.src, floodedMaze, tileSize).view
			)
		}
	}
	render() {
		const invisibleImage = {display: "none"}
		const invisibleCanvas = {opacity: 0}
		const { image, handleClick, user } = this.props

		return (
			<div id="floodFillView" className="floodFill">
				<h3>Is it solvable? {this.state.solvable? 'YES' : 'NO'}</h3>
				<h5>Blue areas of the maze are accessible from the starting point.</h5>
				<div ref="board" id="board"/>
				<img
					id="mazeImage"
					ref="mazeImage"
					src={image}
					alt="simpleMaze"
					style={invisibleImage}
					width={this.state.desiredWidth}
					height={this.state.desiredHeight}
				/>
				<div id="floodFillCanvasAndButtons">
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
					{/* <Link to="/pixi"> */}
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => handleClick(this.state.maze, image, user.id)}
					>
						Play
					</button>
					{/* </Link> */}
					{/* If not solvable show try again sends back to create maze */}
					<Link to="/create-maze">
						<button type="button" className="btn btn-primary">
							Send to a friend
						</button>
					</Link>
				<div className="row">
					<Link to="/create-maze">
						<button type="button" className="btn btn-primary">
							Create new maze
						</button>
					</Link>
				</div>
				</div>
				</ div>
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
		handleClick(maze, image, userId) {
			dispatch(
				uploadMaze({ image: image, solveable: true, data: maze, userId })
			)
		}
	}
}

export default connect(
	mapState,
	mapDispatch
)(FloodFill)
