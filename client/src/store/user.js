import axios from 'axios'
import history from '../history'

let initialState = {
  me: {},
  myFriends: [],
  myMazes: [],
  myPlays: [] // should be plays AND challenges and filter on front end
}

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_FRIENDS = 'GET_FRIENDS'
const GET_CHALLENGES = 'GET_CHALLENGES'
const GET_MAZES = 'GET_MAZES'
const ADD_FRIEND = 'ADD_FRIEND'

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

const addFriend = friend => ({
	type: ADD_FRIEND,
	friend
})

const getChallenges = challenges => ({
	type: GET_CHALLENGES,
	challenges
})

const getMazes = mazes => ({
	type: GET_MAZES,
	mazes
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
	try {
    const res = await axios.get('/auth/me')
		dispatch(getUser(res.data || {}))
	} catch (err) {
		console.error(err)
	}
}

export const auth = (email, password, method) => async dispatch => {
	let res
	try {
		res = await axios.post(`/auth/${method}`, { email, password })
	} catch (authError) {
    console.error(authError)
  }
  
  try {
    dispatch(getUser(res.data))
		method === 'signup'
			? history.push('/tutorial')
			: history.push('/create-maze')
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
			dispatch(getFriends(data))
		} catch (err) {
			console.log('No friends...', err)
		}
	}
}

export const updateFriends = info => {
	return async dispatch => {
		try {
			await axios.put(`api/user/${info.id}/friends`, info.friend)
			dispatch(addFriend(info.friend))
		} catch (err) {
			console.log('User was not added...', err)
		}
	}
}

export const loadChallenges = id => {
	return async dispatch => {
		try {
			const { data } = await axios.get(`api/user/${id}/challenges`)
			dispatch(getChallenges(data))
		} catch (err) {
			console.log('No challenges...', err)
		}
	}
}

export const loadMazes = id => {
	return async dispatch => {
		try {
			const { data } = await axios.get(`api/user/${id}/mazes`)
			dispatch(getMazes(data))
		} catch (err) {
			console.log('No mazes yet!', err)
		}
	}
}

/**
 * REDUCER
 */
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER:
			return {...state, me: action.user}
		case REMOVE_USER:
			return {...state, me: {}}
		case GET_FRIENDS:
			return { ...state, myFriends: action.friends }
		case ADD_FRIEND:
			return { ...state, myFriends: [...state.myFriends, action.friend] }
		case GET_CHALLENGES:
			return { ...state, myPlays: action.challenges }
		case GET_MAZES:
			return { ...state, myMazes: action.mazes }
		default:
			return state
	}
}

export default userReducer
