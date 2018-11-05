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
				
        <button type="button" className="reg-btn menu-option" onClick={this.handleMenuItemClick}>
          <Link to="/create-maze">Create Maze</Link>
        </button>
				
        <button type="button" className="reg-btn menu-option" onClick={this.handleMenuItemClick}>
          <Link to="/featured">Featured</Link>
        </button>

        <button type="button" className="reg-btn menu-option" onClick={this.handleMenuItemClick}>
        <Link to="/my-account">Profile</Link>
        </button>
				
        <button type="button" className="reg-btn menu-option" onClick={this.handleMenuItemClick}>
          <Link to="/friends">Friends</Link>
        </button>

        <button type="button" className="reg-btn menu-option" onClick={this.handleMenuItemClick}>
          <Link to="/tutorial">Tutorial</Link>
        </button>
				
        <button type="button" className="reg-btn menu-option" onClick={this.handleMenuItemClick}>
          <Link to="/" onClick={userLogout}>Logout</Link>
        </button>
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
