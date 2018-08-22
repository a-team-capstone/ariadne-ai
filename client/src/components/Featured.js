import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { loadFeatured } from '../store/featuredMazes'
import { saveMaze } from '../store/maze'
import history from '../history'
import axios from 'axios'

class FeaturedMazes extends Component {
	constructor() {
		super()
		this.handlePlay = this.handlePlay.bind(this)
	}

	componentDidMount() {
		this.props.loadFeatured()
	}

	async handlePlay(evt) {
		evt.preventDefault()
		// console.log('Evt', evt.target)
		const maze = await axios.get(`api/mazes/${evt.target.value}`)
		this.props.saveMaze(maze.data)
		history.push('/pixi')
	}

	render() {
		const { featured } = this.props
		return (
			<div className="featured">
				<h4>Featured Mazes</h4>
				{featured.map(maze => {
					return (
						// <Fragment key={maze.id}>
						// 	<h6>Maze Name</h6>
						// 	<p>Leader: Shelby</p>
						// 	<p>Time: 35 seconds</p>
						// 	<button value={maze.id} onClick={this.handlePlay}>
						// 		Play
						// 	</button>
						// </Fragment>
						<div className="card card-featured" key={maze.id}>
							<div className="card-body">
								<h5 className="card-title">Maze Name</h5>
								<h6 className="card-subtitle mb-2 text-muted">
									Leader: Shelby
								</h6>
								<p className="card-text">Time: 35 seconds</p>
								<wired-button id="featured">
									<button
										className="featured-btn"
										value={maze.id}
										onClick={this.handlePlay}
									>
										Play
									</button>
								</wired-button>
							</div>
						</div>
					)
				})}
			</div>
		)
	}
}

const mapState = state => ({
	featured: state.featured
})

const mapDispatch = dispatch => ({
	loadFeatured: () => dispatch(loadFeatured()),
	saveMaze: id => dispatch(saveMaze(id))
})

export default connect(
	mapState,
	mapDispatch
)(FeaturedMazes)
