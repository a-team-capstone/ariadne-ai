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
	componentDidMount() {
    console.log('the maze in CDM', this.props.maze)
    this.props.loadMaze(this.props.maze.id)
	}

	render() {
    const { maze } = this.props
    const { image } = maze
		const tileSize = Math.floor(this.state.desiredWidth / 25)
		if (maze.data && this.refs.board) {
			const startPoint = maze.ST 
      const endPoint = maze.END

			this.refs.board.appendChild(PixiApp(image, maze.data.data, tileSize, startPoint, endPoint).view)
    }

    return (
      <div>
        <div ref="board" id="pixiGameBoard"/>
      </div>
    )
  }
}

const mapState = state => {
	return {
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
