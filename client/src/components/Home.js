import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<h2>ariadne.ai</h2>
				<Link to="/login">
					<button className="reg-btn">Login</button>
				</Link>
				<Link to="/sign-up">
					<button className="reg-btn">Sign Up</button>
				</Link>
			</div>
		)
	}
}

export default Home
