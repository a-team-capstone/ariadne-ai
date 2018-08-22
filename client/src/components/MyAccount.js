import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadChallenges, loadMazes } from '../store/user'
import { saveMaze } from '../store/maze'
import history from '../history'
import axios from 'axios'

class MyAccount extends Component {
	constructor() {
		super()
		this.handlePlay = this.handlePlay.bind(this)
	}
	async componentDidMount() {
		await this.props.loadChallenges(this.props.user.id)
		await this.props.loadMazes(this.props.user.id)
	}

	async handlePlay(evt) {
		evt.preventDefault()
		const maze = await axios.get(`api/mazes/${evt.target.value}`)
		this.props.saveMaze(maze.data)
		history.push('/pixi')
	}

	render() {
		const { user, challenges, mazes } = this.props
		if (!this.props.challenges || !this.props.mazes) {
			return <h1>Loading...</h1>
		}
		return (
			<div id="profile" className="main">
				<h4>{user.userName}</h4>
				<div>
					<div className="profile-list">
						<h5>Challenges</h5>
						{challenges.length ? (
							challenges.map(challenge => (
								<div className="list-group list-group-flush" key={challenge.id}>
									<div className="list-group-item list-group-item-action flex-column align-items-start">
										<div className="d-flex w-100 justify-content-between">
											<h6 className="mb-1">{challenge.maze.name}</h6>
											<wired-button id="account">
												<button
													className="account-btn"
													value={challenge.maze.id}
													onClick={this.handlePlay}
												>
													Play
												</button>
											</wired-button>
										</div>
									</div>
								</div>
							))
						) : (
							<p>No Challenges Yet!</p>
						)}
					</div>
					<div className="profile-list" id="userMazes">
						<h5>My Mazes</h5>
						{mazes.length ? (
							mazes.map(maze => (
								<div className="list-group list-group-flush" key={maze.id}>
									<div className="list-group-item list-group-item-action flex-column align-items-start">
										<div className="d-flex w-100 justify-content-between">
											<h6 className="mb-1">{maze.name}</h6>
											<wired-button id="account">
												<button
													className="account-btn"
													value={maze.id}
													onClick={this.handlePlay}
												>
													Play
												</button>
											</wired-button>
										</div>
									</div>
								</div>
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

const mapState = state => {
	return {
		user: state.user,
		challenges: state.user.challenges,
		mazes: state.user.mazes
	}
}

const mapDispatch = dispatch => {
	return {
		loadChallenges: id => dispatch(loadChallenges(id)),
		loadMazes: id => dispatch(loadMazes(id)),
		saveMaze: data => dispatch(saveMaze(data))
	}
}

export default connect(
	mapState,
	mapDispatch
)(MyAccount)
