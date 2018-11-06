import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { loadFriends } from '../store/user'
import { Link } from 'react-router-dom'
import FriendSelect from './FriendSelect'
import axios from 'axios'

class SelectFriends extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedFriends: [],
			challengeSent: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const { user, getFriends } = this.props
		getFriends(user.id)
	}

	handleChange(e) {
		const { selectedFriends } = this.state
		const friendId = +e.target.value

		if (selectedFriends.includes(friendId)) {
			this.setState({
				selectedFriends: this.state.selectedFriends.filter(
					id => +id !== friendId
				)
			})
		} else {
			this.setState({
				selectedFriends: [...this.state.selectedFriends, friendId]
			})
		}
	}

	async handleSubmit(e) {
		e.preventDefault()
		const mazeId = this.props.maze.id
		const { selectedFriends } = this.state
		let request = selectedFriends.map(id => ({
			playerId: id,
			seconds: null,
			attempted: false,
			mazeId
		}))
		await axios.post('api/plays/challenge', request)
		this.setState({
			challengeSent: true
		})
	}

	render() {
		const { friends } = this.props
		const { challengeSent } = this.state

		return (
			<Fragment>
				{challengeSent ? (
					<div className="content sentChallenges">
						<h3>Challenges Sent!</h3>
						<img src="/mail.png" alt="mail" />
            <button className="reg-btn">
              <Link to="/pixi">Replay Maze</Link>
            </button>
						<button className="reg-btn">
              <Link to="/create-maze">Create New Maze</Link>
            </button>
					</div>
				) : (
					<div className="content selection">
						<h3>Select Friends to Challenge</h3>
						{friends.length &&
							friends.map(friend => {
								return (
									<FriendSelect
										key={friend.id}
										id={friend.id}
										handleChange={this.handleChange}
										name={friend.userName}/>
								)
							})}
						<button
							type="submit"
							className="reg-btn"
							onClick={this.handleSubmit}>
              Send
						</button>
					</div>
				)}
			</Fragment>
		)
	}
}

const mapState = state => ({
	user: state.user.me,
	friends: state.user.myFriends,
	maze: state.maze.selectedMaze
})

const mapDispatch = dispatch => ({
	getFriends: id => dispatch(loadFriends(id))
})

export default connect(mapState, mapDispatch)(SelectFriends)
