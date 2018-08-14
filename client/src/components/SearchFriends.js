import React, { Component } from 'react'
import { connect } from 'react-redux'

class SearchFriends extends Component {
	constructor() {
		super()
		this.state = {
			query: '',
			results: []
		}
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleInputChange() {
		this.setState({
			query: this.search.value
		})
	}

	render() {
		return (
			<form>
				<input
					placeholder="Search for..."
					ref={input => (this.search = input)}
					onChange={this.handleInputChange}
				/>
				<p>{this.state.query}</p>
			</form>
		)
	}
}

export default SearchFriends
