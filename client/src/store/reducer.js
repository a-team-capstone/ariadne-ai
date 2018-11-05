import { combineReducers } from 'redux'
import imageReducer from './image'
import userReducer from './user'
import featuredReducer from './featuredMazes'
import mazeReducer from './maze'
import usersReducer from './users'

const rootReducer = combineReducers({
  user: userReducer,
  allUsers: usersReducer,
  // Not sure if image reducer is needed,
  // but I think it may be for cases when the image comes from AWS and not the db
	image: imageReducer,
  maze: mazeReducer,
  featured: featuredReducer
})

export default rootReducer
