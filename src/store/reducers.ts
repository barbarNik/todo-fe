import { combineReducers } from 'redux-immutable';
import userReducer from './userStore/UserReducer';
import itemsReducer from './itemsStore/ItemsReducer';

const reducers = combineReducers({
    userReducer,
    itemsReducer
});

export default reducers;