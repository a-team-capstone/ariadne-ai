import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getResults, clearUsers } from '../store/users'
import { updateFriends } from '../store/user'
import Suggestions from './Suggestions'

class SearchFriends extends Component {
	constructor() {
		super()
		this.state = {
			query: ''
		}
		this.search = React.createRef()
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	handleInputChange() {
		this.setState(
			{
				query: this.search.current.value
			},
			() => {
				if (this.state.query && this.state.query.length >= 1) {
					this.props.getResults(this.state.query)
				} else if (this.state.query.length === 0) {
					this.props.clearUsers()
				}
			}
		)
	}

	handleClick(evt, friends) {
		evt.preventDefault()
		this.props.addFriend({ id: this.props.user.id, friend: friends })
	}

	render() {
    let { results, user } = this.props
    console.log('the user on state', user)
		const userFriendIds = user.friends && user.friends.map(friend => friend.id)
		results = results.filter(result => userFriendIds.indexOf(result.id) === -1)
		return (
			<form>
				<div className="form-group">
					<h5>Add new friends</h5>
					<input
						type="text"
						placeholder="Search by name..."
						ref={this.search}
						onChange={this.handleInputChange}
						className="form-control"
					/>
				</div>
				<Suggestions results={results} handleClick={this.handleClick} />
			</form>
		)
	}
}

const mapState = state => {
	return {
		user: state.user,
		results: state.users
	}
}

const mapDispatch = dispatch => {
	return {
		getResults: query => dispatch(getResults(query)),
		clearUsers: () => dispatch(clearUsers()),
		addFriend: friend => dispatch(updateFriends(friend))
	}
}

export default connect(
	mapState,
	mapDispatch
)(SearchFriends)
