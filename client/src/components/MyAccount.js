import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadChallenges, loadMazes } from '../store/user'
import { loadMaze } from '../store/maze'

class MyAccount extends Component {
	constructor() {
		super()
		this.handlePlay = this.handlePlay.bind(this)
  }
  
	componentDidMount() {
    let userId = this.props.user.id
		this.props.loadChallenges(userId)
		this.props.loadMazes(userId)
	}

	async handlePlay(evt) {
    evt.preventDefault()
    let mazeId = evt.target.value
    this.props.getMaze(mazeId)
	}

	render() {
		const { user, challenges, mazes } = this.props
		if (!this.props.challenges || !this.props.mazes) {
			return <h1>Loading...</h1>
		}
		return (
			<div className="content">
				<h3>{user.userName}</h3>
				<div>
					<div>
						<h5>Challenges</h5>
						{challenges.length ? (
							challenges.map(challenge => (
                <div className="card card-featured" key={challenge.id}>
                  <div className="card-body">
                    <h5 className="card-title">{challenge.maze.name}</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">
                      Leader: Shelby
                    </h6> */}
                    {/* <p className="card-text">Time: 35 seconds</p> */}
                      <button
                        className="reg-btn"
                        value={challenge.maze.id}
                        onClick={this.handlePlay}>Play</button>
                  </div>
                </div>
							))
						) : (
							<p>No Challenges Yet!</p>
						)}
					</div>
					<div id="userMazes">
						<h5>My Mazes</h5>
						{mazes.length ? (
							mazes.map(maze => (
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
								// <div className="list-group list-group-flush" key={maze.id}>
								// 	<div className="list-group-item list-group-item-action flex-column align-items-start">
								// 		<div className="d-flex w-100 justify-content-between">
								// 			<h6 className="mb-1">{maze.name}</h6>
								// 				<button
								// 					className="reg-btn"
								// 					value={maze.id}
								// 					onClick={this.handlePlay}>Play</button>
								// 		</div>
								// 	</div>
								// </div>
							))
						) : (
							<p>No Mazes Yet!</p>
						)}
					</div>
				</div>
			</div>
		)
	}
}

const mapState = state => ({
		user: state.user.me,
		challenges: state.user.myPlays,
		mazes: state.user.myMazes
})

const mapDispatch = dispatch => ({
		loadChallenges: id => dispatch(loadChallenges(id)),
		loadMazes: id => dispatch(loadMazes(id)),
		getMaze: id => dispatch(loadMaze(id))
})

export default connect(mapState, mapDispatch)(MyAccount)
