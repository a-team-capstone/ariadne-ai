import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_USERS = 'GET_USERS'
const CLEAR_USERS = 'CLEAR_USERS'

/**
 * ACTION CREATORS
 */
const getUsers = users => ({
	type: GET_USERS,
	users
})

export const clearUsers = () => ({
	type: CLEAR_USERS
})
/**
 * THUNK CREATORS
 */

export const getResults = query => {
	return async dispatch => {
		try {
			const { data } = await axios.get(`api/users/${query}`)
			console.log('Data', data)
			dispatch(getUsers(data))
		} catch (err) {
			console.log('Load users error...', err)
		}
	}
}
/**
 * REDUCER
 */

const usersReducer = (state = [], action) => {
	switch (action.type) {
		case GET_USERS:
			return action.users
		case CLEAR_USERS:
			return []
		default:
			return state
	}
}

export default usersReducer
