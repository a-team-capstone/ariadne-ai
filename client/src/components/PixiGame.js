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
	// 	let is_mobile =
	// 		!!navigator.userAgent.match(/iphone|android|blackberry/gi) || false
	// 	// if (is_mobile) {
	// 	// 	setTimeout(function() {
	// 	// 		window.scrollTo(0, 60)
	// 	// 	}, 500)
	// 	// }
	}

	render() {
		const { maze, user } = this.props
		const { image } = maze
		const tileSize = Math.floor(this.state.desiredWidth / 25)
		if (maze.data && this.refs.board) {
			const startPoint = maze.STA
			const endPoint = maze.END

			this.refs.board.appendChild(
				PixiApp(image, maze, tileSize, startPoint, endPoint, user).view
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
