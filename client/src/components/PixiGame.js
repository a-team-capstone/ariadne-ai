// import * as PIXI from 'pixi.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PixiApp from '../utilities/GameLogic'
// import { getMazeFromImage } from '../utilities/imageAnalysis'
import { loadMaze } from '../store/maze'

class PixiGame extends Component {
	constructor() {
		super()
		this.state = {
			desiredWidth: 600,
			desiredHeight: 800
		}
	}
	componentDidMount() {
		this.props.loadMaze(this.props.maze.id)
	}

	render() {
		const { maze, image } = this.props
		const tileSize = Math.floor(this.state.desiredWidth / 25)
		if (maze.data && this.refs.board) {

			// const startPoint = [25, 100]
			// const endPoint = [25, 500]
			const startPoint = maze.data.ST 
			const endPoint = maze.data.END

			console.log('Maze in Pixi', this.props.maze)
			this.refs.board.appendChild(PixiApp(image, maze.data.data, tileSize, startPoint, endPoint).view)
		return (
			<div>
				<div ref="board" id="pixiGameBoard"/>
			</div>
		)
	}
}

const mapState = state => {
	return {
		image: state.image,
		maze: state.maze
	}
}

const mapDispatch = dispatch => {
	return {
		loadMaze: id => dispatch(loadMaze(id))
	}
}

export default connect(
	mapState,
	mapDispatch
)(PixiGame)
