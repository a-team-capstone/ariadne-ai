import React, { Component } from 'react'
import { connect } from 'react-redux'
import PixiApp from '../utilities/GameLogic'
// import { loadMaze } from '../store/maze'

class PixiGame extends Component {
	constructor() {
		super()
		this.state = {
			desiredWidth: 600,
			desiredHeight: 800
    }
  }

	componentWillUnmount() {
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
    
    console.log('render running, what is defined?')
    console.log('maze: ', maze, 'user: ', user, 'refs: ', this.refs)
    // console.log('MAZE IN PIXI', maze)
    // console.log('what are the refs?', this.refs)

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
      <div ref="board" id="pixiGameBoard"></div>
    )
	}
}

const mapState = state => ({
		maze: state.maze.selectedMaze,
		user: state.user.me
})

export default connect(mapState)(PixiGame)
