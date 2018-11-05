import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadFriends } from '../store/user'
import SearchFriends from './SearchFriends'

class Friends extends Component {
	componentDidMount() {
		this.props.loadFriends(this.props.user.id)
  }
  
	render() {
		const { friends } = this.props
		return (
			<div className="friends">
				<h3>My Friends</h3>
				{friends && friends.map(friend => <p key={friend.id}>{friend.userName}</p>)}
				<SearchFriends/>
			</div>
		)
	}
}

const mapState = state => ({
  user: state.user.me,
	friends: state.user.myFriends
})

const mapDispatch = dispatch => ({
  loadFriends: id => dispatch(loadFriends(id))
})

export default connect(mapState, mapDispatch)(Friends)
