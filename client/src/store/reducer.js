import { combineReducers } from 'redux'
import imageReducer from './image'
import userReducer from './user'
import usersReducer from './users'
import mazeReducer from './maze'

const rootReducer = combineReducers({
	user: userReducer,
	image: imageReducer,
	users: usersReducer,
	maze: mazeReducer
})

export default rootReducer
