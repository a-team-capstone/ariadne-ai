import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import showFloodFill from '../utilities/FloodFillView'
import { getMazeFromImage } from '../utilities/imageAnalysis'
import floodFill from '../utilities/floodFill'
import { uploadMaze } from '../store/maze'
import axios from 'axios'
// import 'wired-elements'
// const fs = require('fs')

// const api = axios.create({
// 	withCredentials: true
// })

class FloodFill extends Component {
	constructor() {
		super()
		this.state = {
			imageHeight: 0,
			imageWidth: 0,
			desiredWidth: 600,
			desiredHeight: 800,
			solvable: 'Analyzing...',
			explainerText:
				'Determining if your maze is solvable based on its boundaries.',
			maze: [],
			obstacles: {},
			imageUrl: 'favicon.ico'
		}
		this.mazeImage = React.createRef()
		this.mazeImageCanvas = React.createRef()
		this.board = React.createRef()
	}

	async componentDidMount() {
		const image = this.mazeImage.current
		const { data } = await axios({
			url: this.props.image,
			method: 'GET',
			responseType: 'blob' // important
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
			this.mazeImageCanvas.current,
			image,
			tileSize,
			this.props.image
		)
		// const mazeGoal = { row: mazeGrid.length - 1, col: mazeGrid[0].length - 1 }
		const maze = mazeGrid.map(row => row.slice())
		await this.setState({ maze: maze, obstacles: obstacleAvgs })

		const startPoint = obstacleAvgs.STA || [24, 24]
		const endPoint = obstacleAvgs.END || [744, 552]
		let startRow = Math.round(startPoint[0] / tileSize)
		let startCol = Math.round(startPoint[1] / tileSize)
		let endRow = Math.round(endPoint[0] / tileSize)
		let endCol = Math.round(endPoint[1] / tileSize)

		const floodedMaze = floodFill(startRow, startCol, mazeGrid, tileSize, 1)
		const solvable = floodedMaze[endRow][endCol] === -1
		const explainerText = solvable
			? 'Blue dots indicate reachable areas in the maze.'
			: 'Your power-ups may say otherwise, though. Try to play your maze to be sure!'
		this.setState({ solvable, explainerText })

		this.board.current.appendChild(
			showFloodFill(image.src, floodedMaze, tileSize, startPoint, endPoint).view
		)
	}

	render() {
		const invisibleImage = { display: 'none' }
		const invisibleCanvas = { opacity: 0 }
		const { image, handleClick, user } = this.props
		const imageUrl = this.state.imageUrl
		const { solvable, explainerText } = this.state

		return (
			<div id="floodFillView">
				{solvable === 'Analyzing...' ? (
					<h4>{solvable}</h4>
				) : (
					<p>
						{solvable ? 'Your maze is solvable!' : 'Your maze is not solvable!'}
					</p>
				)}
				<p>{explainerText}</p>
				<div ref={this.board} id="floodFillCanvas" />
				<img
					id="mazeImage"
					ref={this.mazeImage}
					src={imageUrl}
					alt="simpleMaze"
					style={invisibleImage}
					width={this.state.desiredWidth}
					height={this.state.desiredHeight}
				/>
				<div>
					<div className="row">
						<canvas
							id="mazeImageCanvas"
							ref={this.mazeImageCanvas}
							style={invisibleCanvas}
							width={this.state.desiredWidth}
							height={this.state.desiredHeight}
						/>
					</div>

					<div className="row" id="floodFillButtons">
						<Link to="/create-maze">
							<wired-button id="send-btn">Send to a friend</wired-button>
						</Link>
						<button
							type="button"
							className="play-btn"
							onClick={() =>
								handleClick(
									this.state.maze,
									image,
									user.id,
									this.state.solvable,
									this.state.obstacles
								)
							}
						>
							<wired-button id="play-btn">Play</wired-button>
						</button>
						<Link to="/create-maze">
							<wired-button id="newmaze-btn">New maze</wired-button>
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
		handleClick(maze, image, userId, solvable, obstacles) {
			dispatch(
				uploadMaze({
					image: image,
					solvable: solvable,
					data: maze,
					userId,
					STA: obstacles.STA || [24, 24],
					END: obstacles.END || [744, 552],
					BMB: obstacles.BMB || null,
					XTM: obstacles.XTM || null,
					FRZ: obstacles.FRZ || null,
					TEL: obstacles.TEL || null,
					PRT: obstacles.PRT || null,
					SLD: obstacles.SLD || null,
					WPN: obstacles.WPN || null,
					time: obstacles.time || 30
				})
			)
		}
	}
}

export default connect(
	mapState,
	mapDispatch
)(FloodFill)
