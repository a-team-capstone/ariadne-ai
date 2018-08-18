import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */
const SAVE_MAZE = 'SAVE_MAZE'
const GET_MAZE = 'GET_MAZE'

/**
 * ACTION CREATORS
 */
const saveMaze = maze => ({
	type: SAVE_MAZE,
	maze
})

const getMaze = maze => ({
	type: GET_MAZE,
	maze
})

/**
 * THUNK CREATORS
 */
export const uploadMaze = maze => {
	console.log('maze in thunk', maze)
	return async dispatch => {
		try {
			const { data } = await axios.post(`api/mazes/`, maze)
			// console.log('Maze data', data)
			dispatch(saveMaze(data.id))
			history.push('/pixi')
		} catch (err) {
			console.log('There was a problem. Maze was not saved...', err)
		}
	}
}

export const loadMaze = mazeId => {
	console.log('Load maze thunk', mazeId)
	return async dispatch => {
		try {
			const { data } = await axios.get(`api/mazes/${mazeId}`)
			console.log('Data loadMaze', data)
			dispatch(getMaze(data))
		} catch (err) {
			console.log('There was a problem getting your maze...', err)
		}
	}
}

const initialState = {
	id: 0,
	data: {}
}

/**
 * REDUCER
 */
const mazeReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_MAZE:
			return { ...state, id: action.maze }
		case GET_MAZE:
			return { ...state, data: action.maze}
		default:
			return state
	}
}

export default mazeReducer
