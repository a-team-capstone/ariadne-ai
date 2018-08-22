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
export const saveMaze = maze => ({
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
	return async dispatch => {
		try {
			const { data } = await axios.post(`api/mazes/`, maze)
			dispatch(saveMaze(data))
			history.push('/pixi')
		} catch (err) {
			console.log('There was a problem. Maze was not saved...', err)
		}
	}
}

export const loadMaze = mazeId => {
	return async dispatch => {
		try {
			const { data } = await axios.get(`api/mazes/${mazeId}`)
			dispatch(getMaze(data))
		} catch (err) {
			console.log('There was a problem getting your maze...', err)
		}
	}
}

/**
 * REDUCER
 */
const mazeReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_MAZE:
			return action.maze
		case GET_MAZE:
			return { ...state, data: action.maze}
		default:
			return state
	}
}

export default mazeReducer
