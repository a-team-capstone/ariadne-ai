import { combineReducers } from 'redux'
import imageReducer from './image'
import userReducer from './user'

const rootReducer = combineReducers({
	user: userReducer,
	image: imageReducer
})

export default rootReducer
