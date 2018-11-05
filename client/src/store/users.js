import axios from 'axios'

let initialState = []


const GET_USERS = 'GET_USERS'
const CLEAR_USERS = 'CLEAR_USERS'


const getUsers = users => ({
	type: GET_USERS,
	users
})

export const clearUsers = () => ({
	type: CLEAR_USERS
})


export const loadAllUsers = () => {
	return async dispatch => {
		try {
			const { data } = await axios.get('api/users')
			dispatch(getUsers(data))
		} catch (err) {
			console.error('Could not load all users', err)
		}
	}
}


const usersReducer = (state = initialState, action) => {
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
