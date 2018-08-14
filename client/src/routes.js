import React, { Component } from 'react'
import PixiGame from './components/PixiGame'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { me } from './store/user'
import { Signup, Login } from './components/Form'
import Home from './components/Home'
import MyAccount from './components/MyAccount'
import Game from './components/Game'
import CreateMaze from './components/CreateMaze'
import WithNavBar from './components/WithNavBar'

class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}
	render() {
		const { isLoggedIn } = this.props
		return (
			<div className="main-container">
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/sign-up" component={Signup} />
					<Route exact path="/" component={Home} />
					{isLoggedIn && (
						<Switch>
							<WithNavBar>
								<Route path="/my-account" component={MyAccount} />
								<Route path="/create-maze" component={CreateMaze} />
							</WithNavBar>
							<Route path="/pixi" component={PixiGame} />
							<Route path="/game" component={Game} />
						</Switch>
					)}
				</Switch>
			</div>
		)
	}
}

const mapState = state => {
	return {
		isLoggedIn: !!state.user.id,
		isAdmin: state.user.isAdmin
	}
}

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me())
		}
	}
}

export default withRouter(
	connect(
		mapState,
		mapDispatch
	)(Routes)
)

/**
 * PROP TYPES
 */
Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}
