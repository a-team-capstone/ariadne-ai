import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store/user'

const Form = props => {
	const { name, displayName, handleSubmit, error } = props
	return (
		<div className="login">
			<form onSubmit={handleSubmit} name={name}>
				<div className="form-group input">
					<label htmlFor="email">Email</label>
					<input name="email" type="text" className="form-control" />
				</div>
				<div className="form-group input">
					<label htmlFor="password">Password</label>
					<input name="password" type="password" className="form-control" />
				</div>
				<div>
						<button type="submit" className="reg-btn">{displayName}</button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
			<a href={
					process.env.NODE_ENV === 'development'
						? 'http://localhost:3001/auth/google'
						: 'auth/google'
				}>
				{displayName} with Google
			</a>
		</div>
	)
}

const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error
})

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error
})

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    dispatch(auth(email, password, formName))
  }
})

export const Login = connect(mapLogin, mapDispatch)(Form)
export const Signup = connect(mapSignup, mapDispatch)(Form)

Form.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.object
}
