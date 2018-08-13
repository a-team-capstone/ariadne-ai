import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * ACTION CREATORS
 */
const getUser = user => ({
	type: GET_USER,
	user
})
const removeUser = () => ({
	type: REMOVE_USER
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
	console.log('Here')
	try {
		const res = await axios.get('auth/me')
		dispatch(getUser(res.data || {}))
	} catch (err) {
		console.error(err)
	}
}

export const auth = (email, password, method) => async dispatch => {
	let res
	try {
		res = await axios.post(`auth/${method}`, { email, password })
	} catch (authError) {
		return dispatch(getUser({ error: authError }))
	}
	try {
		dispatch(getUser(res.data))
		history.push('/my-account')
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr)
	}
}

export const logout = () => async dispatch => {
	try {
		await axios.post('auth/logout')
		dispatch(removeUser())
		history.push('/')
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
const userReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_USER:
			return action.user
		case REMOVE_USER:
			return {}
		default:
			return state
	}
}

export default userReducer
