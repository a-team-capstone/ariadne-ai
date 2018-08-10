import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';

// Use for development
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

// Use for production
// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(rootReducer, middleware);

export default store;
