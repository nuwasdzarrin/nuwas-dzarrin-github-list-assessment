import { combineReducers } from 'redux'
import { repoReducer } from './repo/reducer'

export default combineReducers({
    repo: repoReducer
})
