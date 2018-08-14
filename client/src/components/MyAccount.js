import React, { Component } from 'react'
import { connect } from 'react-redux'
import UploadImage from './UploadImage'
import { logout, loadFriends } from '../store/user'
import { Link } from 'react-router-dom'

class MyAccount extends Component {
	componentDidMount() {
		this.props.loadFriends(this.props.user.id)
	}
	render() {
		const { user, isLoggedIn, handleClick, image } = this.props
		return (
			<div className="my-account">
				<div className="circle" />
				<h4>Welcome, {user.userName}</h4>
				<div>
					{Object.keys(image).length ? (
						<Link to="/pixi">
							<button type="button" className="btn btn-info">
								Play
							</button>
						</Link>
					) : (
						<UploadImage />
					)}
				</div>
				<div>
					<h4>Friends</h4>
					{user.friends &&
						user.friends.map(friend => (
							<p key={friend.id}>{friend.userName}</p>
						))}
				</div>

				{isLoggedIn && (
					<Link to="/" onClick={handleClick}>
						Logout
					</Link>
				)}
			</div>
		)
	}
}

const mapState = state => {
	return {
		user: state.user,
		isLoggedIn: !!state.user.id,
		image: state.image
	}
}

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout())
		},
		loadFriends: id => dispatch(loadFriends(id))
	}
}

export default connect(
	mapState,
	mapDispatch
)(MyAccount)
