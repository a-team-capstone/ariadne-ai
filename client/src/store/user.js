import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_FRIENDS = 'GET_FRIENDS'

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

const getFriends = friends => ({
	type: GET_FRIENDS,
	friends
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

export const loadFriends = id => {
	return async dispatch => {
		try {
			const { data } = await axios.get(`api/user/${id}/friends`)
			console.log('Data friends', data.friend)
			dispatch(getFriends(data.friend))
		} catch (err) {
			console.log('No friends...', err)
		}
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
		case GET_FRIENDS:
			return { ...state, friends: action.friends }
		default:
			return state
	}
}

export default userReducer
