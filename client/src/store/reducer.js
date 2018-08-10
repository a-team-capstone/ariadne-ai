import { combineReducers } from 'redux';
import imageReducer from './image';

const rootReducer = combineReducers({
  image: imageReducer,
});

export default rootReducer;
