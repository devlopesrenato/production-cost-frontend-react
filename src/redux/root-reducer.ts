import { combineReducers } from 'redux'
import userReducer from './user/reducer';
import themeReducer from './themes/reducer';

const rootReducer = combineReducers({
    userReducer,
    themeReducer
})

export default rootReducer;