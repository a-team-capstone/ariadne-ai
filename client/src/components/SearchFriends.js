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
        return userFriendIds.indexOf(user.id) === -1
        && user.userName.toLowerCase().indexOf(query.toLowerCase()) > -1
      })
      : []

		return (
      <div id="friend-search">
				<div>
					<h5 style={{ paddingBottom: '25px' }}>Search for New Friends</h5>
					<input
            type="text"
            style={{ borderRadius: '2px', padding: '3px', letterSpacing: '.025em' }}
            placeholder="Search by username..."
            value={this.state.query}
						onChange={this.handleChange}/>
				</div>
        {
          query.length ?
          <Suggestions results={results} handleClick={this.handleClick} />
          : null
        } 
      </div>
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
