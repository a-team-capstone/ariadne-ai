import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'wired-elements'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<h2>ariadne.ai</h2>
				<Link to="/login">
					<wired-button id="login-btn">Login</wired-button>
				</Link>
				<Link to="/sign-up">
					<wired-button id="signup-btn">Sign Up</wired-button>
				</Link>
			</div>
		)
	}
}

export default Home
