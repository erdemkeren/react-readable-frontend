import { combineReducers } from 'redux'
import postListReducer from './postListReducer'
import postDetailReducer from './postDetailReducer'

const rootReducer = combineReducers({
  postListReducer,
  postDetailReducer,
})

export default rootReducer
