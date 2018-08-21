import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getUserFriends } from '../store/friends'

class SelectFriends extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedFriends: []
    }
  }

  componentDidMount () {
    this.props.getFriends()
  }
  
  render () {
    const { friends } = this.props
    return (
      <Fragment>
      {
        friends.forEach(friend => {
          return (
            <div class="form-check" key={friend.id}>
              <input class="form-check-input" type="checkbox" value={friend.id} id="defaultCheck1" />
              <label class="form-check-label" for="defaultCheck1">
                {friend.userName}
              </label>
            </div>
          )
        })
      }
      </Fragment>
    )
  }
}

const mapState = state => ({
  friends: state.friends
})

const mapDispatch = dispatch => ({
  getFriends: id => dispatch(getUserFriends(id))
})

export default connect(mapState, mapDispatch)(SelectFriends)
