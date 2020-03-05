import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import order from './order'
import stock from './stock'

// Combines the reducers created in other files. Adds thunk and redux logging middleware. 
const reducer = combineReducers({user, order, stock})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

// Creates redux store. 
const store = createStore(reducer, middleware)


// Exports the store created and methods from the other files in /store 
export default store
export * from './user'
export * from './order'
export * from './stock'