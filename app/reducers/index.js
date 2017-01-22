import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  pet: require('./pet').default,
})

export default rootReducer
