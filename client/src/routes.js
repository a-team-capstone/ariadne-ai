import React, { Component } from 'react'
<<<<<<< HEAD
import { Route, Switch } from 'react-router-dom'
import PixiGame from './components/PixiGame'


class Routes extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route path="/sign-up" />
          <Route path="/main-view"  />
          <Route exact path="/pixi" component={PixiGame} />
        </Switch>
      </div>
    );
  }
=======
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { me } from './store/user'
import { Signup, Login } from './components/Form'
import Home from './components/Home'
import MyAccount from './components/MyAccount'
import Game from './components/Game'

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
					<Route path="/game" component={Game} />
					<Route exact path="/" component={Home} />
					{isLoggedIn && (
						<Switch>
							<Route path="/my-account" component={MyAccount} />
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
>>>>>>> master
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
