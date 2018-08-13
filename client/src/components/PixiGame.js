import * as PIXI from 'pixi.js'
import React, { Component } from 'react'
import PixiApp from '../utilities/GameLogic'

class PixiGame extends Component {
	componentDidMount(){
		this.refs.board.appendChild(PixiApp.view)
	}

	render(){
		return (
			<div ref="board">
			<h1>PixiGame</h1>
			</div>
		)
	}
}

export default PixiGame
