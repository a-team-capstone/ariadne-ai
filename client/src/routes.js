import React, { Component } from 'react'
import PixiGame from './components/PixiGame'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { me } from './store/user'
import { Signup, Login } from './components/Form'
import Home from './components/Home'
import MyAccount from './components/MyAccount'
import WithNavBar from './components/WithNavBar'
import FeaturedMazes from './components/Featured'
import Friends from './components/Friends'
import FloodFill from './components/FloodFill'
import TutorialPage from './components/TutorialPage'
import Create from './components/Create'
import SelectFriends from './components/SelectFriends'

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
					<Route path="/pixi" component={PixiGame} />
					<Route exact path="/" component={Home} />
					{isLoggedIn && (
            <WithNavBar>
              <Switch>
                <Route path="/my-account" component={MyAccount} />
                <Route path="/create-maze" component={Create} />
                <Route path="/featured" component={FeaturedMazes} />
                <Route path="/friends" component={Friends} />
                <Route path="/flood-fill" component={FloodFill} />
                <Route path="/tutorial" component={TutorialPage} />
                <Route path="/select-friends" component={SelectFriends} />
              </Switch>
            </WithNavBar>
					)}
				</Switch>
			</div>
		)
	}
}

const mapState = state => ({
  isLoggedIn: !!state.user.me.id,
  isAdmin: state.user.me.isAdmin
})

const mapDispatch = dispatch => ({
	loadInitialData: () => dispatch(me())
})

Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

