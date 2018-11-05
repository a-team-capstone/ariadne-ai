import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAllUsers, clearUsers } from '../store/users'
import { updateFriends } from '../store/user'
import Suggestions from './Suggestions'

class SearchFriends extends Component {
	constructor() {
		super()
		this.state = {
			query: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
  }
  
  componentDidMount () {
    this.props.loadAllUsers()
  }

	handleChange(evt) {
		this.setState({ query: evt.target.value })
	}

	handleClick(evt, friends) {
		evt.preventDefault()
    this.props.addFriend({ id: this.props.user.id, friend: friends })
    this.setState({ query: '' })
	}

	render() {
    let { query } = this.state
    let { allUsers, friends } = this.props
		const userFriendIds = friends && friends.map(friend => friend.id)
    let results = allUsers ?
      allUsers.filter(user => {
        return userFriendIds.indexOf(user.id) === -1 && user.userName.indexOf(query) > -1
      })
      : []

		return (
			<form>
				<div className="form-group">
					<h5>Find new friends</h5>
					<input
						type="text"
            placeholder="Search by username..."
            value={this.state.query}
						onChange={this.handleChange}
					/>
				</div>
        {
          query.length ?
          <Suggestions results={results} handleClick={this.handleClick} />
          : null
        }
			</form>
		)
	}
}

const mapState = state => ({
  user: state.user.me,
  friends: state.user.myFriends,
  allUsers: state.allUsers
})

const mapDispatch = dispatch => ({
  loadAllUsers: () => dispatch(loadAllUsers()),
  clearUsers: () => dispatch(clearUsers()),
  addFriend: friend => dispatch(updateFriends(friend))
})

export default connect(mapState, mapDispatch)(SearchFriends)
