import { combineReducers } from 'redux'
import userReducer from './user/reducer';
import themeReducer from './themes/reducer';
import notificationReducer from './notification/reducer';
import parametersReducer from './parameters/reducer';

const rootReducer = combineReducers({
    userReducer,
    themeReducer,
    notificationReducer,
    parametersReducer
})

export default rootReducer;