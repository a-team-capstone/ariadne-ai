import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadFriends } from '../store/user'

class Friends extends Component {
	componentDidMount() {
		this.props.loadFriends(this.props.user.id)
	}
	render() {
		const { user } = this.props
		return (
			<div>
				<h3>Friends</h3>
				{user.friends &&
					user.friends.map(friend => <p key={friend.id}>{friend.userName}</p>)}
			</div>
		)
	}
}

const mapState = state => {
	return {
		user: state.user
	}
}

const mapDispatch = dispatch => {
	return {
		loadFriends: id => dispatch(loadFriends(id))
	}
}

export default connect(
	mapState,
	mapDispatch
)(Friends)
