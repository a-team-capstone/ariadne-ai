import React, { Component } from 'react'
import { connect } from 'react-redux'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { logout } from '../store/user'
import '../css/Navbar.css'

class Navbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			menuOpen: false
		}
		this.handler = this.handler.bind(this)
	}

	handleStateChange(state) {
		this.setState({ menuOpen: state.isOpen })
	}

	handlerCloseSideBar = () => {
		this.setState({ menuOpen: false })
	}

	// This can be used to close the menu, e.g. when a user clicks a menu item
	handler(e) {
		e.preventDefault()
		this.setState({
			menuOpen: false
		})
	}

	render() {
		const { isLoggedIn, handleClick } = this.props
		return (
			<Menu
				className="menu"
				isOpen={this.state.menuOpen}
				onStateChange={state => this.handleStateChange(state)}
			>
				<Link to="/create-maze" onClick={this.handlerCloseSideBar}>
					<wired-button id="create-nav">Create Maze</wired-button>
				</Link>
				<Link to="/featured" onClick={this.handlerCloseSideBar}>
					<wired-button id="featured-nav">Featured</wired-button>
				</Link>
				<Link to="/my-account" onClick={this.handlerCloseSideBar}>
					<wired-button id="profile-nav">Profile</wired-button>
				</Link>
				<Link to="/friends" onClick={this.handlerCloseSideBar}>
					<wired-button id="friends-nav">Friends</wired-button>
				</Link>
				<Link to="/tutorial" onClick={this.handlerCloseSideBar}>
					<wired-button id="help-nav">Tutorial</wired-button>
				</Link>
				{isLoggedIn && (
					<Link to="/" onClick={handleClick}>
						<wired-button id="logout-nav">Logout</wired-button>
					</Link>
				)}
			</Menu>
		)
	}
}

const mapState = state => {
	return {
		isLoggedIn: !!state.user.id
	}
}

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout())
		}
	}
}

export default connect(
	mapState,
	mapDispatch
)(Navbar)
