import React, { Component } from 'react'
// import { Login } from './Form'
import { Link } from 'react-router-dom'
import { WiredButton } from 'wired-elements'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<h2>ariadne.ai</h2>
				<Link to="/login">
					{/* <button type="button" className="btn btn-primary">
						Login
					</button> */}
					<wired-button id="login-btn">Login</wired-button>
				</Link>
				<Link to="/sign-up">
					{/* <button type="button" className="btn btn-primary">
						Sign up
					</button> */}
					<wired-button id="signup-btn">Sign Up</wired-button>
				</Link>
			</div>
		)
	}
}

export default Home
