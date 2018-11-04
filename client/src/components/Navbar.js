import React, { Component } from 'react'
import { connect } from 'react-redux'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { logout } from '../store/user'
import '../css/Navbar.css'

class Navbar extends Component {
	constructor() {
		super()
		this.state = {
      open: false
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
	}

	handleMenuClick (evt) {
    evt.preventDefault()
    this.setState({ open: !this.state.open })
  }

	handleMenuItemClick (evt) {
    evt.preventDefault()
		this.setState({ open: false })
	}

	render() {
    const { isLoggedIn, userLogout } = this.props
    return isLoggedIn ? 
		(
			<Menu className="menu" isOpen={this.state.open} onClick={this.handleMenuClick}>
				<Link to="/create-maze" onClick={this.handleMenuItemClick}>
          <button type="button" className="reg-btn menu-option" id="create-nav">Create Maze</button>
				</Link>
				<Link to="/featured" onClick={this.handleMenuItemClick}>
          <button type="button" className="reg-btn menu-option" id="featured-nav">Featured</button>
				</Link>
				<Link to="/my-account" onClick={this.handleMenuItemClick}>
          <button type="button" className="reg-btn menu-option" id="profile-nav">Profile</button>
				</Link>
				<Link to="/friends" onClick={this.handleMenuItemClick}>
          <button type="button" className="reg-btn menu-option" id="friends-nav">Friends</button>
				</Link>
				<Link to="/tutorial" onClick={this.handleMenuItemClick}>
          <button type="button" className="reg-btn menu-option" id="help-nav">Tutorial</button>
				</Link>
        <Link to="/" onClick={userLogout}>
          <button type="button" className="reg-btn menu-option" id="logout-nav">Logout</button>
        </Link>
			</Menu>
    )
    : null
	}
}

const mapState = state => ({
  isLoggedIn: !!state.user.me.id
})

const mapDispatch = dispatch => ({
  userLogout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Navbar)
