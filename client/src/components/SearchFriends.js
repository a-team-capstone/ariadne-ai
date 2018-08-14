import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getResults, clearUsers } from '../store/users'
import Suggestions from './Suggestions'

class SearchFriends extends Component {
	constructor() {
		super()
		this.state = {
			query: ''
		}
		this.search = React.createRef()
		this.handleInputChange = this.handleInputChange.bind(this)
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

	render() {
		return (
			<form>
				<div className="form-group">
					<input
						type="text"
						placeholder="Search for..."
						ref={this.search}
						onChange={this.handleInputChange}
						className="form-control"
					/>
				</div>
				<Suggestions results={this.props.results} />
			</form>
		)
	}
}

const mapState = state => {
	return {
		results: state.users
	}
}

const mapDispatch = dispatch => {
	return {
		getResults: query => dispatch(getResults(query)),
		clearUsers: () => dispatch(clearUsers())
	}
}

export default connect(
	mapState,
	mapDispatch
)(SearchFriends)
