import { combineReducers } from 'redux'
import imageReducer from './image'
import userReducer from './user'
import featuredReducer from './featuredMazes'
import mazeReducer from './maze'
import usersReducer from './users'

const rootReducer = combineReducers({
	user: userReducer,
	image: imageReducer,
	filteredUsers: usersReducer,
  maze: mazeReducer,
  featured: featuredReducer
})

export default rootReducer
