import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import authUser  from './authUser'
import users  from './users'
import questions from './questions'

export default combineReducers({
  authUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
})