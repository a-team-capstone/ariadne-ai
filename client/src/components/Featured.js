import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadFeatured } from '../store/featuredMazes'
import { loadMaze } from '../store/maze'

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
    let mazeId = evt.target.value
		this.props.getMaze(mazeId)
	}

	render() {
    const { featured } = this.props
		return (
			<div className="featured">
				<h4>Featured Mazes</h4>
				{featured.map(maze => {
					return (
						<div className="card card-featured" key={maze.id}>
							<div className="card-body">
								<h5 className="card-title">{maze.name}</h5>
								{/* <h6 className="card-subtitle mb-2 text-muted">
									Leader: Shelby
								</h6> */}
								{/* <p className="card-text">Time: 35 seconds</p> */}
									<button
										className="reg-btn"
										value={maze.id}
										onClick={this.handlePlay}>Play</button>
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
	getMaze: id => dispatch(loadMaze(id))
})

export default connect(mapState, mapDispatch)(FeaturedMazes)
