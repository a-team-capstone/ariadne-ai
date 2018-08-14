import { combineReducers } from 'redux'
import imageReducer from './image'
import userReducer from './user'
import usersReducer from './users'

const rootReducer = combineReducers({
	user: userReducer,
	image: imageReducer,
	users: usersReducer
})

export default rootReducer
