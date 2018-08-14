import React, { Component } from 'react'
import { connect } from 'react-redux'

class MyAccount extends Component {
	// componentDidMount() {
	// 	this.props.loadFriends(this.props.user.id)
	// }
	render() {
		const { user } = this.props
		return (
			<div className="my-account">
				<div className="circle" />
				<h4>Welcome, {user.userName}</h4>
			</div>
		)
	}
}

const mapState = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapState,
	null
)(MyAccount)
