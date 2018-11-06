import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import showFloodFill from '../utilities/FloodFillView'
import { getMazeFromImage } from '../utilities/imageAnalysis'
import floodFill from '../utilities/floodFill'
import { uploadMaze } from '../store/maze'
import axios from 'axios'

class FloodFill extends Component {
	constructor() {
		super()
		this.state = {
			imageHeight: 0,
			imageWidth: 0,
			desiredWidth: 600,
      desiredHeight: 800,
      // maybe need to change the desired height and width?
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
    this.handlePlay = this.handlePlay.bind(this)
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
    
		const maze = mazeGrid.map(row => row.slice())
		await this.setState({ maze: maze, obstacles: obstacleAvgs })

		const startPoint = obstacleAvgs.STA || [24, 24]
		const endPoint = obstacleAvgs.END || [744, 552]
		let startRow = Math.round(startPoint[0] / tileSize)
		let startCol = Math.round(startPoint[1] / tileSize)
		let endRow = Math.min(Math.round(endPoint[0] / tileSize), mazeGrid.length - 1)
		let endCol = Math.min(Math.round(endPoint[1] / tileSize), mazeGrid[0].length -1)

		const floodedMaze = floodFill(startRow, startCol, mazeGrid, tileSize, 1)
		
		const solvable = floodedMaze[endRow][endCol] === -1
		const explainerText = solvable
			? `Any area with blue dots is reachable. Ready?`
			: 'Your power-ups may help you defy the laws of solvability! Give it a try!'
		this.setState({ solvable, explainerText })

		this.board.current.appendChild(
			showFloodFill(image.src, floodedMaze, tileSize, startPoint, endPoint).view
		)
  }
  
  handlePlay (evt) {
    evt.preventDefault()
    const { saveMaze, image, user } = this.props
    const { maze, solvable, obstacles } = this.state
    saveMaze(maze, image, user.id, solvable, obstacles)
  }

	render() {
		const invisibleImage = { display: 'none' }
		const invisibleCanvas = { opacity: 0 }
		const imageUrl = this.state.imageUrl
		const { solvable, explainerText } = this.state

		return (
			<div id="floodFillView">
				{solvable === 'Analyzing...' ? (
					<h2>{solvable}</h2>
				) : (
					<h3>
						{solvable ? `It's solvable!` : 'Unsolvable! Or is it?'}
					</h3>
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
					height={this.state.desiredHeight}/>

				<div>
					<div className="row">
						<canvas
							id="mazeImageCanvas"
							ref={this.mazeImageCanvas}
							style={invisibleCanvas}
							width={this.state.desiredWidth}
							height={this.state.desiredHeight}/>
					</div>

					<div id="floodFillButtons">
            <button className="reg-btn">
              <Link to="/create-maze">Discard maze</Link>
            </button>
						<button
							type="button"
							className="reg-btn"
              onClick={this.handlePlay}>Play maze</button>
					</div>
				</div>
			</div>
		)
	}
}

const mapState = state => ({
  user: state.user.me,
  image: state.image
})

const mapDispatch = dispatch => ({
  saveMaze(maze, image, userId, solvable, obstacles) {
    dispatch(uploadMaze({
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
})

export default connect(mapState, mapDispatch)(FloodFill)
