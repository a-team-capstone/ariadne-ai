import React, { Component } from 'react'
import { connect } from 'react-redux'
import PixiApp from '../utilities/GameLogic'

class PixiGame extends Component {
	constructor() {
		super()
		this.state = {
			desiredWidth: 600,
			desiredHeight: 800
    }
  }

  componentDidMount () {
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
  }

  componentWillMount () {
    document.body.style.backgroundColor = '#000000'
  }

	componentWillUnmount() {
    document.body.style.backgroundColor = '#FFFFFF'
		window.downHandlers.forEach(
			listener => window.removeEventListener("keydown", listener)
		)
		window.upHandlers.forEach(
			listener => window.removeEventListener("keyup", listener)
		)
	}

	render() {
    return <div ref="board" id="pixiGameBoard"></div>
	}
}

const mapState = state => ({
		maze: state.maze.selectedMaze,
		user: state.user.me
})

export default connect(mapState)(PixiGame)
