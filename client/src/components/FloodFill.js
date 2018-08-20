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
			solvable: 'Analyzing...',
			explainerText:
				'Determining if your maze is solvable based on its boundaries.',
			maze: [],
			obstacles: {}
		}
	}

	componentDidMount() {
		const image = this.refs.mazeImage
		image.crossOrigin = 'Anonymous'

		const tileSize = Math.floor(this.state.desiredWidth / 25)

		image.onload = async () => {
			this.setState({
				imageHeight: image.naturalHeight,
				imageWidth: image.naturalWidth
			})
			const { mazeGrid, obstacleAvgs } = await getMazeFromImage(
				this.refs.mazeImageCanvas,
				image,
				tileSize
			)
			const mazeGoal = { row: mazeGrid.length - 1, col: mazeGrid[0].length - 1 }
			const maze = mazeGrid.map(row => row.slice())
			this.setState({ maze: maze, obstacles: obstacleAvgs })

			const startPoint = obstacleAvgs.ST || [24, 24]
			const endPoint = obstacleAvgs.END || [744, 552]
			var startRow = Math.round(startPoint[0] / tileSize)
			var startCol = Math.round(startPoint[1] / tileSize)
			var endRow = Math.round(endPoint[0] / tileSize)
			var endCol = Math.round(endPoint[1] / tileSize)

			const floodedMaze = floodFill(startRow, startCol, mazeGrid, tileSize, 1)
			const solvable = floodedMaze[endRow][endCol] === -1
			const explainerText = solvable
				? 'Blue dots indicate reachable areas in the maze.'
				: 'Your power-ups may say otherwise, though. Try to play your maze to be sure!'
			this.setState({ solvable, explainerText })

			this.refs.board.appendChild(
				showFloodFill(image.src, floodedMaze, tileSize, startPoint, endPoint)
					.view
			)
		}
	}

	render() {
		const invisibleImage = { display: 'none' }
		const invisibleCanvas = { opacity: 0 }
		const { image, handleClick, user } = this.props
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
				<div ref="board" id="floodFillCanvas" />
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
						<Link to="/create-maze">
							<button type="button" className="btn btn-primary">
								Send to a friend
							</button>
						</Link>
						<button
							type="button"
							id="playButton"
							className="btn btn-primary"
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
							Play
						</button>
						<Link to="/create-maze">
							<button type="button" className="btn btn-primary">
								New maze
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
		handleClick(maze, image, userId, solvable, obstacles) {
			dispatch(
				uploadMaze({
					image: image,
					solvable: solvable,
					data: maze,
					userId,
					ST: obstacles.ST || [24, 24],
					END: obstacles.END || [744, 552],
					BM: obstacles.BM || null,
					XT: obstacles.XT || null,
					FZ: obstacles.FZ || null,
					TEL: obstacles.TEL || null,
					PRT: obstacles.PRT || null,
					SD: obstacles.SD || null,
					WP: obstacles.WP || null,
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
