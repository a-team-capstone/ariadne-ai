import React, { Component } from 'react'
import { connect } from 'react-redux'
import PixiApp from '../utilities/GameLogic'
import { loadMaze } from '../store/maze'

class PixiGame extends Component {
	constructor() {
		super()
		this.state = {
			desiredWidth: 600,
			desiredHeight: 800
		}
	}
	async componentDidMount() {
		await this.props.loadMaze(this.props.maze.id)
	}

	componentWillUnmount() {
		console.log('window.downHandlers', window.downHandlers)
		console.log('window.upHandlers', window.upHandlers)
		window.downHandlers.forEach(
			listener => window.removeEventListener("keydown", listener)
		)
		window.upHandlers.forEach(
			listener => window.removeEventListener("keyup", listener)
		)
	}

	render() {
		const { maze, user } = this.props
		const { image } = maze
		const tileSize = Math.floor(this.state.desiredWidth / 25)
		if (maze.data && this.refs.board) {
			const startPoint = maze.STA
			const endPoint = maze.END

			this.refs.board.appendChild(
				PixiApp(
					image,
					maze,
					tileSize,
					startPoint,
					endPoint,
					user,
					this.props.history
				).view
			)
		}

		return (
			<div>
				<div ref="board" id="pixiGameBoard" />
			</div>
		)
	}
}

const mapState = state => {
	return {
		maze: state.maze,
		user: state.user
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
