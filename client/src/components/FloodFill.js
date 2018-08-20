import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import showFloodFill from '../utilities/FloodFillView'
import { getMazeFromImage } from '../utilities/imageAnalysis'
import floodFill from '../utilities/floodFill'
import { uploadMaze } from '../store/maze'
import axios from 'axios'
const fs = require('fs')

const api = axios.create({
	withCredentials: true
})

class FloodFill extends Component {
	constructor() {
		super()
		this.state = {
			imageHeight: 0,
			imageWidth: 0,
			desiredWidth: 600,
			desiredHeight: 800,
			solvable: '...analyzing',
			explainerText: 'Detecting accessible maze regions using flood fill algorithm',
			maze: [],
			obstacles: {},
			imageUrl: 'favicon.ico'
		}
	}

	async componentDidMount() {
		const image = this.refs.mazeImage
		const { data } = await axios({
  			url: this.props.image,
  			method: 'GET',
  			responseType: 'blob', // important
		})
		const newUrl = URL.createObjectURL(data)
		image.crossOrigin = 'Anonymous'
		const tileSize = Math.floor(this.state.desiredWidth / 25)

		await this.setState({
			imageUrl: newUrl,
			imageHeight: image.naturalHeight,
			imageWidth: image.naturalWidth
		})
		const { mazeGrid, obstacleAvgs } = await getMazeFromImage(
			this.refs.mazeImageCanvas,
			image,
			tileSize,
			this.props.image
		)
		const mazeGoal = {row: mazeGrid.length-1, col: mazeGrid[0].length-1}
		const maze = mazeGrid.map(row => row.slice())
		await this.setState({ maze: maze, obstacles: obstacleAvgs })



		const startPoint = obstacleAvgs.ST || [24, 24]
		const endPoint = obstacleAvgs.END || [744, 552]
		console.log('start, end', startPoint, endPoint)
		var startRow = Math.round(startPoint[0]/tileSize)
		var startCol = Math.round(startPoint[1]/tileSize)
		var endRow = Math.round(endPoint[0]/tileSize)
		var endCol = Math.round(endPoint[1]/tileSize)

		console.log('calling floodFill, starting at (row, col)', startRow, startCol, 'ending at', endRow, endCol)
		const floodedMaze = floodFill(startRow, startCol, mazeGrid, tileSize, 1)
		const solvable = (floodedMaze[endRow][endCol] === -1) ? 'YES' : 'NO'
		const explainerText = 'Blue dots = accessible from starting point.'
		await this.setState({solvable, explainerText})

		this.refs.board.appendChild(
			showFloodFill(image.src, floodedMaze, tileSize, startPoint, endPoint).view)
		
		}

	render() {
		const invisibleImage = {display: "none"}
		const invisibleCanvas = {opacity: 0}
		const { image, handleClick, user } = this.props
		const solveable = this.state.solvable
		const imageUrl = this.state.imageUrl
		console.log("obstacles", this.state.obstacles)
		return (
			<div id="floodFillView" className="floodFill">
				<h3>Is it solvable? {this.state.solvable}</h3>
				<h5>{this.state.explainerText}</h5>
				<div ref="board" id="floodFillCanvas"/>
				<img
					id="mazeImage"
					ref="mazeImage"
					src={imageUrl}
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
					</Link>
					{/* <Link to="/pixi"> */}
					<button
						type="button"
						id="playButton"
						className="btn btn-primary"
						onClick={() => handleClick(this.state.maze, image, user.id, solveable, this.state.obstacles)}
					>
						Play
					</button>
					{/* </Link> */}
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
		handleClick(maze, image, userId, solveable, obstacles) {
			dispatch(
				uploadMaze({
					image: image,
					solveable: solveable,
					data: maze,
					userId,
					ST: obstacles.ST || [24, 24],
					END: obstacles.END || [744, 552],
					// BM: obstacles.BM,
					// XT: obstacles.XT,
					// FZ: obstacles.FZ,
					// TEL: obstacles.TEL,
					// PRT: obstacles.PRT,
					// time: obstacles.time || 30
					 })
			)
		}
	}
}

export default connect(
	mapState,
	mapDispatch
)(FloodFill)
