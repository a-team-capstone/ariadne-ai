import { combineReducers } from 'redux'
import imageReducer from './image'
import userReducer from './user'
import featuredReducer from './featuredMazes'
import mazeReducer from './maze'
import usersReducer from './users'
import friendsReducer from './friends'

const rootReducer = combineReducers({
	user: userReducer,
	image: imageReducer,
	users: usersReducer,
  maze: mazeReducer,
  featured: featuredReducer,
  friends: friendsReducer
})

export default rootReducer
