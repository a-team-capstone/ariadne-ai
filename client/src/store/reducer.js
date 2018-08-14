import { combineReducers } from 'redux'
import imageReducer from './image'
import userReducer from './user'
import featuredReducer from './featuredMazes'

const rootReducer = combineReducers({
	user: userReducer,
  image: imageReducer,
  featured: featuredReducer
})

export default rootReducer
