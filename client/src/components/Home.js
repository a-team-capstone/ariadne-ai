import React, { Component } from 'react'
// import { Login } from './Form'
import { Link } from 'react-router-dom'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<h2>ariadne.ai</h2>
				<Link to="/login">
					<button type="button" className="btn btn-primary">
						Login
					</button>
				</Link>
				<Link to="/sign-up">
					<button type="button" className="btn btn-primary">
						Sign up
					</button>
				</Link>
			</div>
		)
	}
}

export default Home
