import * as PIXI from 'pixi.js'
import React, { Component } from 'react'
import PixiApp from '../utilities/GameLogic'

class PixiGame extends Component {
	componentDidMount(){
		this.refs.board.appendChild(PixiApp('shelbyMaze.jpg').view)
	}

	render(){
		return (
			<div ref="board">
			</div>
		)
	}
}

export default PixiGame
