import { combineReducers } from 'redux'
import userReducer from './user/reducer';
import themeReducer from './themes/reducer';
import notificationReducer from './notification/reducer';

const rootReducer = combineReducers({
    userReducer,
    themeReducer,
    notificationReducer
})

export default rootReducer;