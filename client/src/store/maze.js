import axios from 'axios'
import history from '../history'

let initialState = {
  allMazes: [],
  selectedMaze: {}
}


const SAVE_MAZE = 'SAVE_MAZE'
const GET_MAZE = 'GET_MAZE'


export const saveMaze = maze => ({
	type: SAVE_MAZE,
	maze
})

const getMaze = maze => ({
	type: GET_MAZE,
	maze
})


export const uploadMaze = maze => {
	return async dispatch => {
		try {
			const { data } = await axios.post(`api/mazes/`, maze)
      dispatch(saveMaze(data))
      return data.id
			// history.push('/pixi')
		} catch (err) {
			console.error('Could not upload new maze', err)
		}
	}
}

export const loadMaze = mazeId => {
	return async dispatch => {
		try {
      const { data } = await axios.get(`api/mazes/${mazeId}`)
      dispatch(getMaze(data))
      history.push('/pixi')
		} catch (err) {
			console.error('Could not get maze', err)
		}
	}
}


const mazeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_MAZE:
			return {...state, allMazes: [...state.allMazes, action.maze]}
		case GET_MAZE:
			return { ...state, selectedMaze: action.maze}
		default:
			return state
	}
}

export default mazeReducer
